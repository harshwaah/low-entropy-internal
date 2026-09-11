import numpy as np
import pandas as pd


BASE_METRICS = [
    "score",
    "accuracy",
    "response_time_sec",
    "hints_used",
    "completion_rate",
    "memory_score",
    "attention_score",
    "sequencing_score",
    "emotional_engagement_score",
    "overall_cognitive_score"
]

def rolling_slope(x):
    x = np.asarray(x)

    if len(x) < 3:
        return np.nan

    t = np.arange(len(x))

    return np.polyfit(t, x, 1)[0]


def create_temporal_features(sessions):
    """
    Recreates the same causal temporal feature engineering
    used during XGBoost training in Colab.

    sessions:
        List of dictionaries representing patient sessions.

    Returns:
        DataFrame containing the feature-engineered sessions.
    """

    df = pd.DataFrame(sessions)

    if df.empty:
        raise ValueError("No session data available.")

    # Make sure data is correctly ordered
    df = df.sort_values(
        ["patient_id", "session_number"]
    ).reset_index(drop=True)

    df_feat = df.copy()

    g = df_feat.groupby(
        "patient_id",
        group_keys=False
    )

    # =========================================================
    # 1. LAG FEATURES
    # =========================================================

    for col in BASE_METRICS:

        df_feat[f"{col}_lag1"] = (
            g[col].shift(1)
        )

        df_feat[f"{col}_lag2"] = (
            g[col].shift(2)
        )

        df_feat[f"{col}_lag3"] = (
            g[col].shift(3)
        )

    # =========================================================
    # 2. ROLLING FEATURES
    # Current session is NOT included.
    # =========================================================

    for col in BASE_METRICS:

        shifted = g[col].shift(1)

        for window in [3, 5, 10, 20]:

            df_feat[f"{col}_mean_{window}"] = (
                shifted
                .groupby(df_feat["patient_id"])
                .transform(
                    lambda x:
                    x.rolling(
                        window,
                        min_periods=window
                    ).mean()
                )
            )

            df_feat[f"{col}_std_{window}"] = (
                shifted
                .groupby(df_feat["patient_id"])
                .transform(
                    lambda x:
                    x.rolling(
                        window,
                        min_periods=window
                    ).std()
                )
            )

    # =========================================================
    # 3. PERSONAL BASELINE
    # Previous sessions only
    # =========================================================

    for col in BASE_METRICS:

        shifted = g[col].shift(1)

        df_feat[f"{col}_baseline"] = (
            shifted
            .groupby(df_feat["patient_id"])
            .transform(
                lambda x:
                x.expanding(
                    min_periods=5
                ).mean()
            )
        )

        df_feat[f"{col}_baseline_diff"] = (
            df_feat[col]
            - df_feat[f"{col}_baseline"]
        )

    # =========================================================
    # 4. SESSION-TO-SESSION CHANGE
    # =========================================================

    for col in BASE_METRICS:

        df_feat[f"{col}_change_1"] = (
            df_feat[col]
            - df_feat[f"{col}_lag1"]
        )

        df_feat[f"{col}_change_3"] = (
            df_feat[col]
            - df_feat[f"{col}_lag3"]
        )

    # =========================================================
    # 5. RECENT VS LONG-TERM
    # =========================================================

    for col in BASE_METRICS:

        recent = df_feat[
            f"{col}_mean_5"
        ]

        longterm = df_feat[
            f"{col}_mean_20"
        ]

        df_feat[
            f"{col}_recent_vs_longterm"
        ] = recent - longterm

    # =========================================================
    # 6. CAUSAL TREND SLOPES
    # =========================================================

    slope_metrics = [
        "score",
        "accuracy",
        "response_time_sec",
        "hints_used",
        "completion_rate",
        "memory_score",
        "attention_score",
        "sequencing_score",
        "overall_cognitive_score"
    ]

    for col in slope_metrics:

        shifted = (
            df_feat
            .groupby("patient_id")[col]
            .shift(1)
        )

        for window in [5, 10, 20]:

            df_feat[
                f"{col}_slope_{window}"
            ] = (
                shifted
                .groupby(df_feat["patient_id"])
                .transform(
                    lambda x:
                    x.rolling(
                        window,
                        min_periods=window
                    ).apply(
                        rolling_slope,
                        raw=True
                    )
                )
            )

    # =========================================================
    # 7. VARIABILITY / CV / RANGE
    # =========================================================

    variability_metrics = [
        "score",
        "accuracy",
        "response_time_sec",
        "hints_used",
        "completion_rate",
        "overall_cognitive_score"
    ]

    for col in variability_metrics:

        for window in [5, 10, 20]:

            mean_col = (
                f"{col}_mean_{window}"
            )

            std_col = (
                f"{col}_std_{window}"
            )

            # Coefficient of variation
            df_feat[
                f"{col}_cv_{window}"
            ] = (
                df_feat[std_col]
                /
                (
                    df_feat[mean_col].abs()
                    + 1e-6
                )
            )

            # Previous sessions only
            shifted = (
                df_feat
                .groupby("patient_id")[col]
                .shift(1)
            )

            rolling_max = (
                shifted
                .groupby(df_feat["patient_id"])
                .transform(
                    lambda x:
                    x.rolling(
                        window,
                        min_periods=window
                    ).max()
                )
            )

            rolling_min = (
                shifted
                .groupby(df_feat["patient_id"])
                .transform(
                    lambda x:
                    x.rolling(
                        window,
                        min_periods=window
                    ).min()
                )
            )

            df_feat[
                f"{col}_range_{window}"
            ] = (
                rolling_max - rolling_min
            )

    # =========================================================
    # 8. SCORE DIRECTION
    # =========================================================

    df_feat["score_direction"] = np.sign(
        df_feat["score_change_1"]
    )

    df_feat["direction_change"] = (
        df_feat["score_direction"]
        !=
        df_feat
        .groupby("patient_id")["score_direction"]
        .shift(1)
    ).astype(int)

    for window in [5, 10, 20]:

        shifted = (
            df_feat
            .groupby("patient_id")["direction_change"]
            .shift(1)
        )

        df_feat[
            f"direction_changes_{window}"
        ] = (
            shifted
            .groupby(df_feat["patient_id"])
            .transform(
                lambda x:
                x.rolling(
                    window,
                    min_periods=window
                ).sum()
            )
        )

    return df_feat