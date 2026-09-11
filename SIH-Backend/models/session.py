from sqlalchemy import Column, Integer, Float, String
from database.database import Base


class CognitiveSession(Base):
    __tablename__ = "cognitive_sessions"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(Integer, nullable=False)
    session_number = Column(Integer, nullable=False)

    game_name = Column(String(100), nullable=False)

    score = Column(Float)
    accuracy = Column(Float)
    response_time = Column(Float)
    attempts = Column(Integer)
    hints_used = Column(Integer)