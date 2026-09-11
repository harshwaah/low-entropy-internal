# SIH Cognitive Support — Backend + ML Integration

## 1. Overview

This repository contains the **FastAPI backend and XGBoost ML integration** for the SIH Cognitive Support prototype.

The system collects cognitive-game session data, stores it in MySQL, generates temporal performance features, and uses an XGBoost model to predict the patient's cognitive performance trend.

> **Important:** This is a performance-trend support system and is **not a medical diagnosis system**.

---

## 2. Technology Stack

| Technology   | Purpose                    |
| ------------ | -------------------------- |
| Python 3.12+ | Backend + ML               |
| FastAPI      | REST API                   |
| Uvicorn      | API server                 |
| MySQL        | Database                   |
| SQLAlchemy   | Database ORM               |
| PyMySQL      | MySQL connection           |
| XGBoost      | Cognitive trend prediction |
| Pandas       | Feature engineering        |
| NumPy        | Numerical processing       |
| Swagger UI   | API testing                |

---

## 3. System Architecture

```text
                    FRONTEND
                       |
                       | REST API
                       ↓
                  FASTAPI
                       |
             ┌─────────┴─────────┐
             ↓                   ↓
           MySQL              ML Service
             |                   |
     Patient Sessions      Feature Engineering
                                 |
                                 ↓
                           240 ML Features
                                 |
                                 ↓
                             XGBoost
                                 |
                                 ↓
                       Cognitive Trend
                                 |
                                 ↓
                            FASTAPI
                                 |
                                 ↓
                              FRONTEND
```

---

# 4. ML Feature

## Cognitive Trend Prediction

The ML model predicts one of four performance trends:

```text
Improving
Stable
Declining
Fluctuating
```

### Workflow

```text
Patient plays cognitive game
        ↓
Session performance recorded
        ↓
Session stored in MySQL
        ↓
Historical sessions retrieved
        ↓
Temporal features generated
        ↓
XGBoost model
        ↓
Trend prediction
        ↓
Frontend dashboard
```

---

# 5. Cognitive Game Metrics

Each session stores metrics such as:

* Score
* Accuracy
* Response time
* Attempts
* Hints used
* Completion rate
* Memory score
* Attention score
* Sequencing score
* Emotional engagement score
* Overall cognitive score

---

# 6. Temporal Feature Engineering

The model does not rely only on the current session.

It analyzes the patient's historical performance.

Features include:

### Lag Features

```text
score_lag1
score_lag2
score_lag3
```

These represent previous session values.

### Rolling Statistics

```text
mean_3
mean_5
mean_10
mean_20

std_3
std_5
std_10
std_20
```

### Baseline Features

```text
score_baseline
score_baseline_diff
```

### Change Features

```text
score_change_1
score_change_3
```

### Trend/Slope Features

```text
score_slope_5
score_slope_10
score_slope_20
```

### Variability Features

```text
score_cv_5
score_cv_10
score_cv_20

score_range_5
score_range_10
score_range_20
```

### Direction Features

```text
score_direction
direction_change
direction_changes_5
direction_changes_10
direction_changes_20
```

The final model uses **240 features**.

---

# 7. ML Model

The final model is **XGBoost multiclass classification**.

Model configuration used during training:

```python
XGBClassifier(
    n_estimators=500,
    max_depth=6,
    learning_rate=0.05,
    subsample=0.85,
    colsample_bytree=0.85,
    min_child_weight=2,
    reg_lambda=1.0,
    objective="multi:softmax",
    num_class=4,
    eval_metric="mlogloss",
    random_state=42,
    n_jobs=-1
)
```

### Label Mapping

The mapping must remain unchanged:

```python
{
    "Declining": 0,
    "Fluctuating": 1,
    "Improving": 2,
    "Stable": 3
}
```

---

# 8. Model Performance

Final test performance:

| Metric       |     Result |
| ------------ | ---------: |
| Accuracy     | **90.58%** |
| Macro F1     | **91.43%** |
| Test samples |     13,000 |

### Class-wise F1

| Trend       |    F1 |
| ----------- | ----: |
| Declining   | 0.894 |
| Fluctuating | 1.000 |
| Improving   | 0.907 |
| Stable      | 0.855 |

The model was evaluated using a **patient-level train/test split** to avoid the same patient's sessions appearing in both training and testing sets.

---

# 9. Project Structure

```text
SIH-Backend/
│
├── database/
│   └── database.py
│
├── ml/
│   ├── feature_engineering.py
│   ├── predictor.py
│   ├── xgboost_model.json
│   └── feature_columns.json
│
├── models/
│   ├── patient.py
│   └── session.py
│
├── routes/
│   ├── patients.py
│   ├── sessions.py
│   └── prediction.py
│
├── schemas/
│   ├── patient.py
│   └── session.py
│
├── services/
│   └── ml_service.py
│
├── main.py
│
├── test_model.py
├── test_data.py
├── controlled_test.py
├── check_features.py
└── debug_patient.py
```

---

# 10. Important Files

## `main.py`

Starts the FastAPI application and registers all API routes.

---

## `database/database.py`

Creates the MySQL connection using SQLAlchemy.

Database:

```text
sih_cognitive
```

---

## `models/session.py`

Defines the `cognitive_sessions` MySQL table.

---

## `ml/feature_engineering.py`

Converts raw session history into the temporal features expected by the ML model.

---

## `ml/xgboost_model.json`

The trained XGBoost model.

**Do not modify this manually.**

---

## `ml/feature_columns.json`

Contains the exact **240 feature names and order** used during model training.

The backend uses this file to ensure the prediction input matches the trained model.

---

## `ml/predictor.py`

Loads the XGBoost model and performs the final prediction.

---

## `services/ml_service.py`

Connects the database with the ML pipeline:

```text
MySQL
 ↓
Sessions
 ↓
Feature Engineering
 ↓
Latest session features
 ↓
XGBoost
 ↓
Trend
```

---

## `routes/prediction.py`

Exposes the ML prediction through FastAPI.

---

# 11. Database

Create a MySQL database:

```sql
CREATE DATABASE sih_cognitive;
```

The backend currently uses:

```text
mysql+pymysql://root:root123@localhost:3306/sih_cognitive
```

### Important

If your MySQL username/password is different, update:

```text
database/database.py
```

---

# 12. Installation

Clone the repository and open the backend folder.

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows:

```bash
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install fastapi uvicorn sqlalchemy pymysql pandas numpy xgboost
```

---

# 13. Run Backend

From the `SIH-Backend` directory:

```bash
uvicorn main:app --reload
```

Backend will run at:

```text
http://127.0.0.1:8000
```

---

# 14. Swagger API Documentation

Open:

```text
http://127.0.0.1:8000/docs
```

Swagger UI can be used to test all backend APIs without requiring the frontend.

---

# 15. Main APIs

## Health Check

```http
GET /health
```

Response:

```json
{
    "status": "healthy"
}
```

---

## Root

```http
GET /
```

Response:

```json
{
    "message": "SIH Backend is running"
}
```

---

## Patient APIs

```http
GET /patients
```

Used to retrieve the patient list.

---

## Session APIs

```http
GET /sessions/{patient_id}
```

Used to retrieve a patient's cognitive-game history.

---

## Prediction API

```http
POST /predict/{patient_id}
```

This is the main ML endpoint.

Example:

```http
POST /predict/2
```

Response:

```json
{
    "patient_id": 2,
    "session_number": 21,
    "trend": "Fluctuating"
}
```

---

# 16. Prediction Requirements

The current temporal feature pipeline requires enough historical sessions to generate all required features.

The backend currently requires:

```text
Minimum = 21 sessions
```

If fewer than 21 sessions are available, the prediction API returns an error.

Example:

```json
{
    "detail": "At least 21 sessions are required to generate a prediction."
}
```

---

# 17. Frontend Integration

The frontend should **not directly access the XGBoost model**.

Frontend communicates only with FastAPI.

### Recommended flow

```text
Frontend
   |
   | GET /patients
   ↓
Patient List
   |
   | GET /sessions/{patient_id}
   ↓
Session History
   |
   | POST /predict/{patient_id}
   ↓
Cognitive Trend
```

Example frontend request:

```javascript
fetch("http://127.0.0.1:8000/predict/2", {
    method: "POST"
})
```

Example response:

```json
{
    "patient_id": 2,
    "session_number": 21,
    "trend": "Fluctuating"
}
```

The frontend can then display:

```text
Cognitive Trend: Fluctuating
```

---

# 18. Current Integration Status

| Component                | Status     |
| ------------------------ | ---------- |
| MySQL database           | ✅ Working  |
| Patient table            | ✅ Working  |
| Cognitive sessions table | ✅ Working  |
| FastAPI server           | ✅ Working  |
| Swagger                  | ✅ Working  |
| Feature engineering      | ✅ Working  |
| 240 ML features          | ✅ Verified |
| XGBoost model            | ✅ Working  |
| Model loading            | ✅ Verified |
| Backend → ML integration | ✅ Verified |
| Prediction API           | ✅ Verified |
| Frontend integration     | 🔄 Next    |
| Dashboard visualization  | 🔄 Next    |

---

# 19. Important Development Rules

### 1. Do not modify the ML model

The current trained model is:

```text
ml/xgboost_model.json
```

Do not retrain or replace it unless specifically required.

### 2. Do not change feature names

The model expects exactly the features stored in:

```text
ml/feature_columns.json
```

### 3. Do not change label mapping

Keep:

```text
0 → Declining
1 → Fluctuating
2 → Improving
3 → Stable
```

### 4. Frontend does not interact with XGBoost

The frontend only communicates with FastAPI.

### 5. MySQL stores data, not the ML model

The XGBoost model remains a file in:

```text
ml/xgboost_model.json
```

MySQL stores patient/session information.

---

# 20. Complete End-to-End Flow

```text
1. Patient plays cognitive game
            ↓
2. Game generates session metrics
            ↓
3. Frontend sends session to FastAPI
            ↓
4. FastAPI stores session in MySQL
            ↓
5. Patient completes enough sessions
            ↓
6. Frontend requests prediction
            ↓
7. FastAPI retrieves patient's sessions
            ↓
8. Temporal feature engineering
            ↓
9. Latest session → 240 ML features
            ↓
10. XGBoost prediction
            ↓
11. Trend returned by FastAPI
            ↓
12. Frontend displays trend
```

---

# 21. Current MVP Goal

The immediate goal is to complete this end-to-end flow:

```text
GAME
 ↓
POST SESSION
 ↓
MYSQL
 ↓
PREDICTION API
 ↓
XGBOOST
 ↓
TREND
 ↓
DASHBOARD
```

For the hackathon MVP, the priority is a **working end-to-end prototype** rather than further model optimization.

---

## 22. Team Handoff

### ML

Already completed:

* Dataset preparation
* Temporal feature engineering
* Patient-level train/test split
* XGBoost training
* Model evaluation
* Model export
* Backend feature compatibility verification

### Backend

Already completed:

* MySQL connection
* SQLAlchemy models
* Patient APIs
* Session APIs
* ML service
* Prediction API
* Swagger testing

### Frontend — Next

Frontend team needs to:

1. Connect to FastAPI.
2. Display patients.
3. Display session history.
4. Send prediction request.
5. Display cognitive trend.
6. Connect game session submission to `POST /sessions`.
7. Test the complete flow.

---

## 23. Final Status

**Backend + ML integration is working.**

Verified prediction API:

```http
POST /predict/2
```

Verified response:

```json
{
    "patient_id": 2,
    "session_number": 21,
    "trend": "Fluctuating"
}
```

The next development priority is **frontend ↔ FastAPI integration and end-to-end testing**.
