from pydantic import BaseModel


class SessionCreate(BaseModel):
    patient_id: int
    session_number: int
    game_name: str
    score: float
    accuracy: float
    response_time: float
    attempts: int
    hints_used: int


class SessionResponse(BaseModel):
    id: int
    patient_id: int
    session_number: int
    game_name: str
    score: float
    accuracy: float
    response_time: float
    attempts: int
    hints_used: int

    class Config:
        from_attributes = True