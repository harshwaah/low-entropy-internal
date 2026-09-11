from pydantic import BaseModel


class SessionCreate(BaseModel):
    patient_id: int
    session_number: int
    game_name: str

    score: float
    accuracy: float
    response_time_sec: float
    attempts: int
    hints_used: int

    completion_rate: float
    memory_score: float
    attention_score: float
    sequencing_score: float
    emotional_engagement_score: float
    overall_cognitive_score: float


class SessionResponse(BaseModel):
    id: int
    patient_id: int
    session_number: int
    game_name: str

    score: float
    accuracy: float
    response_time_sec: float
    attempts: int
    hints_used: int

    completion_rate: float
    memory_score: float
    attention_score: float
    sequencing_score: float
    emotional_engagement_score: float
    overall_cognitive_score: float

    class Config:
        from_attributes = True