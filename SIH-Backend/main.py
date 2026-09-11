from fastapi import FastAPI

from database.database import Base, engine

from models.patient import Patient
from models.session import CognitiveSession

from routes.patients import router as patient_router
from routes.sessions import router as session_router


# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="SIH Cognitive Support API",
    description="Backend API for cognitive game performance tracking and trend prediction",
    version="1.0.0"
)


# Register routes
app.include_router(patient_router)
app.include_router(session_router)


@app.get("/")
def root():
    return {
        "message": "SIH Backend is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }