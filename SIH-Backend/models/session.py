from sqlalchemy import Column, Integer, Float, String
from database.database import Base


class CognitiveSession(Base):
    __tablename__ = "cognitive_sessions"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(Integer, nullable=False)
    session_number = Column(Integer, nullable=False)

    game_name = Column(String(100), nullable=False)

    score = Column(Float, nullable=False)
    accuracy = Column(Float, nullable=False)

    # Keep existing MySQL column "response_time"
    # but expose it in Python as response_time_sec
    response_time_sec = Column(
        "response_time_sec",
        Float,
        nullable=False
    )

    attempts = Column(Integer, nullable=False)
    hints_used = Column(Integer, nullable=False)

    completion_rate = Column(Float, nullable=False)
    memory_score = Column(Float, nullable=False)
    attention_score = Column(Float, nullable=False)
    sequencing_score = Column(Float, nullable=False)
    emotional_engagement_score = Column(Float, nullable=False)
    overall_cognitive_score = Column(Float, nullable=False)