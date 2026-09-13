import json
import os
from pathlib import Path

import pandas as pd
from sqlalchemy import create_engine, text

from ml.feature_engineering import create_temporal_features


# Database connection loaded from environment variable
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "mysql+pymysql://root@localhost:3306/sih_cognitive"
)

engine = create_engine(DATABASE_URL)

PATIENT_ID = 2


# =========================================================
# GET PATIENT SESSIONS
# =========================================================

with engine.connect() as connection:

    result = connection.execute(
        text("""
            SELECT
                patient_id,
                session_number,
                score,
                accuracy,
                response_time_sec,
                attempts,
                hints_used,
                completion_rate,
                memory_score,
                attention_score,
                sequencing_score,
                emotional_engagement_score,
                overall_cognitive_score
            FROM cognitive_sessions
            WHERE patient_id = :patient_id
            ORDER BY session_number
        """),
        {"patient_id": PATIENT_ID}
    )

    sessions = [
        dict(row._mapping)
        for row in result
    ]


print("Sessions found:", len(sessions))


# =========================================================
# CREATE FEATURES
# =========================================================

features = create_temporal_features(sessions)


# =========================================================
# LOAD TRAINING FEATURE LIST
# =========================================================

FEATURE_PATH = Path("ml") / "feature_columns.json"

with open(FEATURE_PATH, "r") as f:
    training_features = json.load(f)


print("Training features:", len(training_features))


# =========================================================
# COMPARE FEATURES
# =========================================================

missing = [
    feature
    for feature in training_features
    if feature not in features.columns
]

extra = [
    feature
    for feature in features.columns
    if feature not in training_features
]


print("Missing training features:", len(missing))
print("Extra backend features:", len(extra))


if missing:
    print("\nMISSING FEATURES:")
    for feature in missing:
        print(feature)


if extra:
    print("\nEXTRA BACKEND FEATURES:")
    for feature in extra:
        print(feature)


# =========================================================
# SELECT EXACT TRAINING FEATURES
# =========================================================

backend_selected = features[training_features]


print(
    "\nBackend selected feature shape:",
    backend_selected.shape
)


# =========================================================
# CHECK FEATURE ORDER
# =========================================================

order_correct = (
    list(backend_selected.columns)
    == training_features
)

print(
    "Feature order correct:",
    order_correct
)


print("\nFirst 10 training features:")
print(training_features[:10])

print("\nFirst 10 backend-selected features:")
print(
    list(backend_selected.columns[:10])
)