import json
from pathlib import Path

import pandas as pd
import xgboost as xgb


BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = BASE_DIR / "xgboost_model.json"
FEATURE_COLUMNS_PATH = BASE_DIR / "feature_columns.json"


# =========================================================
# LOAD MODEL
# =========================================================

model = xgb.XGBClassifier()

model.load_model(
    str(MODEL_PATH)
)


# =========================================================
# LOAD EXACT FEATURE ORDER
# =========================================================

with open(FEATURE_COLUMNS_PATH, "r") as f:
    FEATURE_COLUMNS = json.load(f)


# =========================================================
# LABEL MAPPING
# Same mapping used in Colab
# =========================================================

REVERSE_MAP = {
    0: "Declining",
    1: "Fluctuating",
    2: "Improving",
    3: "Stable"
}


def predict_trend(feature_df: pd.DataFrame) -> str:

    # Check that all expected features exist
    missing_features = [
        feature
        for feature in FEATURE_COLUMNS
        if feature not in feature_df.columns
    ]

    if missing_features:
        raise ValueError(
            f"Missing features: {missing_features}"
        )

    # Exact feature order used during training
    X = feature_df[
        FEATURE_COLUMNS
    ].copy()

    # Ensure all values are numeric
    X = X.apply(
        pd.to_numeric,
        errors="coerce"
    )

    # Final NaN check
    if X.isna().any().any():

        missing = X.columns[
            X.isna().any()
        ].tolist()

        raise ValueError(
            f"NaN values found in features: {missing}"
        )

    prediction = model.predict(X)

    prediction_number = int(
        prediction[0]
    )

    return REVERSE_MAP[
        prediction_number
    ]