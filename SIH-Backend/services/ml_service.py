from sqlalchemy.orm import Session

from models.session import CognitiveSession

from ml.feature_engineering import create_temporal_features
from ml.predictor import predict_trend


MINIMUM_HISTORY = 20


def predict_patient_trend(
    patient_id: int,
    db: Session
):

    # ---------------------------------------------------------
    # Get all sessions for patient
    # ---------------------------------------------------------

    sessions = (
        db.query(CognitiveSession)
        .filter(
            CognitiveSession.patient_id
            == patient_id
        )
        .order_by(
            CognitiveSession.session_number
        )
        .all()
    )

    if not sessions:
        raise ValueError(
            "No sessions found for this patient."
        )

    # ---------------------------------------------------------
    # Need at least 20 previous sessions
    # ---------------------------------------------------------

    if len(sessions) < MINIMUM_HISTORY + 1:
        raise ValueError(
            "At least 21 sessions are required "
            "to generate a prediction."
        )

    # ---------------------------------------------------------
    # Convert database records to dictionaries
    # ---------------------------------------------------------

    session_data = []

    for session in sessions:

        session_data.append({
            "patient_id": session.patient_id,
            "session_number": session.session_number,

            "score": session.score,
            "accuracy": session.accuracy,
            "response_time_sec": session.response_time_sec,
            "attempts": session.attempts,
            "hints_used": session.hints_used,

            "completion_rate":
                session.completion_rate,

            "memory_score":
                session.memory_score,

            "attention_score":
                session.attention_score,

            "sequencing_score":
                session.sequencing_score,

            "emotional_engagement_score":
                session.emotional_engagement_score,

            "overall_cognitive_score":
                session.overall_cognitive_score
        })

    # ---------------------------------------------------------
    # Create temporal features
    # ---------------------------------------------------------

    feature_df = create_temporal_features(
        session_data
    )

    # ---------------------------------------------------------
    # Use the latest session only
    # ---------------------------------------------------------

    latest_session = feature_df.iloc[
        [-1]
    ].copy()

    # ---------------------------------------------------------
    # Remove rows with incomplete history
    # ---------------------------------------------------------

    if latest_session.isna().any().any():

        raise ValueError(
            "Insufficient historical data to "
            "generate all required ML features."
        )

    # ---------------------------------------------------------
    # XGBoost prediction
    # ---------------------------------------------------------

    trend = predict_trend(
        latest_session
    )

    return {
        "patient_id": patient_id,
        "session_number":
            int(latest_session["session_number"].iloc[0]),
        "trend": trend
    }