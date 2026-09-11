from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from services.ml_service import predict_patient_trend


router = APIRouter(
    prefix="/predict",
    tags=["Predictions"]
)


@router.post("/{patient_id}")
def predict_patient(
    patient_id: int,
    db: Session = Depends(get_db)
):

    try:

        result = predict_patient_trend(
            patient_id,
            db
        )

        return result

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Prediction error: {str(e)}"
        )