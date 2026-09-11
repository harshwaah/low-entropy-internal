from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from models.patient import Patient
from models.session import CognitiveSession
from schemas.session import SessionCreate, SessionResponse


router = APIRouter(
    prefix="/sessions",
    tags=["Sessions"]
)


@router.post("/", response_model=SessionResponse)
def create_session(
    session: SessionCreate,
    db: Session = Depends(get_db)
):

    patient = db.query(Patient).filter(
        Patient.id == session.patient_id
    ).first()

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient not found"
        )

    new_session = CognitiveSession(
        patient_id=session.patient_id,
        session_number=session.session_number,
        game_name=session.game_name,

        score=session.score,
        accuracy=session.accuracy,
        response_time_sec=session.response_time_sec,
        attempts=session.attempts,
        hints_used=session.hints_used,

        completion_rate=session.completion_rate,
        memory_score=session.memory_score,
        attention_score=session.attention_score,
        sequencing_score=session.sequencing_score,
        emotional_engagement_score=session.emotional_engagement_score,
        overall_cognitive_score=session.overall_cognitive_score
    )

    db.add(new_session)
    db.commit()
    db.refresh(new_session)

    return new_session


@router.get(
    "/patient/{patient_id}",
    response_model=list[SessionResponse]
)
def get_patient_sessions(
    patient_id: int,
    db: Session = Depends(get_db)
):

    patient = db.query(Patient).filter(
        Patient.id == patient_id
    ).first()

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient not found"
        )

    sessions = db.query(CognitiveSession).filter(
        CognitiveSession.patient_id == patient_id
    ).order_by(
        CognitiveSession.session_number
    ).all()

    return sessions