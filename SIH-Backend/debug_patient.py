from database.database import SessionLocal
from models.session import CognitiveSession

from ml.feature_engineering import create_temporal_features
from ml.predictor import predict_trend, FEATURE_COLUMNS
import ml.predictor as predictor


# ---------------------------------------------------------
# CONFIGURATION
# ---------------------------------------------------------

PATIENT_ID = 2


# ---------------------------------------------------------
# LOAD PATIENT SESSIONS FROM MYSQL
# ---------------------------------------------------------

db = SessionLocal()

try:
    sessions = (
        db.query(CognitiveSession)
        .filter(CognitiveSession.patient_id == PATIENT_ID)
        .order_by(CognitiveSession.session_number)
        .all()
    )

    print(f"Sessions: {len(sessions)}")

    if not sessions:
        print(f"No sessions found for patient {PATIENT_ID}")
        exit()


    # -----------------------------------------------------
    # CONVERT SQLAlchemy OBJECTS -> DICTIONARIES
    # -----------------------------------------------------

    session_data = []

    for s in sessions:
        session_data.append({
            "patient_id": s.patient_id,
            "session_number": s.session_number,

            "score": s.score,
            "accuracy": s.accuracy,
            "response_time_sec": s.response_time_sec,
            "attempts": s.attempts,
            "hints_used": s.hints_used,
            "completion_rate": s.completion_rate,

            "memory_score": s.memory_score,
            "attention_score": s.attention_score,
            "sequencing_score": s.sequencing_score,
            "emotional_engagement_score": s.emotional_engagement_score,
            "overall_cognitive_score": s.overall_cognitive_score,
        })


    # -----------------------------------------------------
    # CREATE TEMPORAL FEATURES
    # -----------------------------------------------------

    feature_df = create_temporal_features(session_data)


    # -----------------------------------------------------
    # FEATURE CHECK
    # -----------------------------------------------------

    print("Backend features:", len(feature_df.columns))
    print("Training features:", len(FEATURE_COLUMNS))

    selected = feature_df[FEATURE_COLUMNS].copy()

    print("Selected shape:", selected.shape)

    print(
        "NaN count:",
        selected.isna().sum().sum()
    )


    # -----------------------------------------------------
    # USE ONLY THE LAST SESSION
    # -----------------------------------------------------

    last_row = selected.iloc[[-1]].copy()

    print("\nLast session number:")
    print(last_row["session_number"].iloc[0])


    # -----------------------------------------------------
    # CHECK LAST ROW FOR NaN
    # -----------------------------------------------------

    last_nan_count = last_row.isna().sum().sum()

    print("Last-row NaN count:", last_nan_count)

    if last_nan_count > 0:
        print("\nNaN FEATURES:")

        nan_features = last_row.columns[
            last_row.isna().any()
        ].tolist()

        for feature in nan_features:
            print(feature)

        raise ValueError(
            "Last session contains NaN features."
        )


    # -----------------------------------------------------
    # MODEL PROBABILITIES
    # -----------------------------------------------------

    print("\n=== MODEL PROBABILITIES ===")

    probabilities = predictor.model.predict_proba(
        last_row
    )[0]

    for class_id, probability in enumerate(probabilities):

        class_name = predictor.REVERSE_MAP[class_id]

        print(
            f"{class_id}: "
            f"{probability:.4f} "
            f"-> {class_name}"
        )


    # -----------------------------------------------------
    # FINAL PREDICTION
    # -----------------------------------------------------

    prediction = predict_trend(last_row)

    print("\nFINAL PREDICTION:", prediction)


finally:
    db.close()