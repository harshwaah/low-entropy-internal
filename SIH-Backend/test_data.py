
import requests
import random

BASE_URL = "http://127.0.0.1:8000"

PATIENT_ID = 1

games = [
    "My Memory Trail",
    "Morning Mission",
    "Familiar Sound Detective",
    "Who Called Me Today?",
    "Emotion Garden"
]

random.seed(42)

for session_number in range(1, 22):

    # Gradually improving performance so the test trajectory
    # resembles an "Improving" patient.
    progress = (session_number - 1) / 20

    score = 60 + (15 * progress) + random.uniform(-3, 3)
    accuracy = 0.70 + (0.20 * progress) + random.uniform(-0.03, 0.03)

    response_time_sec = 6.0 - (1.5 * progress) + random.uniform(-0.3, 0.3)

    attempts = max(1, round(4 - (1.5 * progress) + random.uniform(-0.5, 0.5)))
    hints_used = max(0, round(3 - (2 * progress) + random.uniform(-0.5, 0.5)))

    completion_rate = min(
        1.0,
        max(
            0.0,
            0.75 + (0.20 * progress) + random.uniform(-0.03, 0.03)
        )
    )

    memory_score = score + random.uniform(-2, 2)
    attention_score = score + random.uniform(-2, 2)
    sequencing_score = score + random.uniform(-2, 2)
    emotional_engagement_score = score + random.uniform(-2, 2)

    overall_cognitive_score = (
        memory_score
        + attention_score
        + sequencing_score
        + emotional_engagement_score
    ) / 4

    data = {
        "patient_id": PATIENT_ID,
        "session_number": session_number,
        "game_name": games[(session_number - 1) % len(games)],
        "score": round(score, 2),
        "accuracy": round(accuracy, 3),
        "response_time_sec": round(response_time_sec, 2),
        "attempts": attempts,
        "hints_used": hints_used,
        "completion_rate": round(completion_rate, 3),
        "memory_score": round(memory_score, 2),
        "attention_score": round(attention_score, 2),
        "sequencing_score": round(sequencing_score, 2),
        "emotional_engagement_score": round(
            emotional_engagement_score, 2
        ),
        "overall_cognitive_score": round(
            overall_cognitive_score, 2
        )
    }

    response = requests.post(
        f"{BASE_URL}/sessions/",
        json=data
    )

    if response.status_code in [200, 201]:
        print(
            f"Session {session_number:02d} "
            f"created successfully"
        )
    else:
        print(
            f"Session {session_number:02d} FAILED "
            f"({response.status_code})"
        )
        print(response.text)
        break

print("\nTest data insertion finished.")

