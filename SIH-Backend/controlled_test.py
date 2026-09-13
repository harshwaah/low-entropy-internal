import os
import requests
import random

BASE_URL = os.getenv("BACKEND_API_URL", "http://127.0.0.1:8000")

games = [
    "My Memory Trail",
    "Morning Mission",
    "Familiar Sound Detective",
    "Who Called Me Today?",
    "Emotion Garden"
]

random.seed(100)


def generate_session(patient_id, session_number, mode):
    progress = (session_number - 1) / 20

    # Base performance depending on the expected trend
    if mode == "improving":
        score = 55 + 25 * progress
        accuracy = 0.65 + 0.28 * progress
        response_time = 7.0 - 2.5 * progress
        hints = 3.0 - 2.5 * progress

    elif mode == "stable":
        score = 72
        accuracy = 0.82
        response_time = 5.0
        hints = 1.5

    elif mode == "declining":
        score = 82 - 25 * progress
        accuracy = 0.93 - 0.28 * progress
        response_time = 4.5 + 3.0 * progress
        hints = 1.0 + 2.5 * progress

    elif mode == "fluctuating":
        score = 70 + random.uniform(-18, 18)
        accuracy = 0.80 + random.uniform(-0.18, 0.18)
        response_time = 5.5 + random.uniform(-1.8, 1.8)
        hints = 2 + random.uniform(-1.5, 1.5)

    # Small noise
    score += random.uniform(-2, 2)
    accuracy += random.uniform(-0.02, 0.02)
    response_time += random.uniform(-0.2, 0.2)

    accuracy = max(0.1, min(1.0, accuracy))
    response_time = max(1.0, response_time)
    hints = max(0, round(hints))

    attempts = max(1, round(4 - hints * 0.5))

    completion_rate = 0.70 + (accuracy * 0.25)
    completion_rate = max(0.0, min(1.0, completion_rate))

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

    return {
        "patient_id": patient_id,
        "session_number": session_number,
        "game_name": games[(session_number - 1) % len(games)],
        "score": round(score, 2),
        "accuracy": round(accuracy, 3),
        "response_time_sec": round(response_time, 2),
        "attempts": attempts,
        "hints_used": hints,
        "completion_rate": round(completion_rate, 3),
        "memory_score": round(memory_score, 2),
        "attention_score": round(attention_score, 2),
        "sequencing_score": round(sequencing_score, 2),
        "emotional_engagement_score": round(emotional_engagement_score, 2),
        "overall_cognitive_score": round(overall_cognitive_score, 2)
    }


# --------------------------------------------------
# IMPORTANT:
# Change these IDs to patient IDs that exist in
# your MySQL patients table.
# --------------------------------------------------

patients = {
    2: "improving",
    3: "stable",
    4: "declining",
    5: "fluctuating"
}


# Insert 21 sessions for each patient
for patient_id, mode in patients.items():

    print(f"\nCreating Patient {patient_id} -> {mode.upper()}")

    for session_number in range(1, 22):

        data = generate_session(
            patient_id,
            session_number,
            mode
        )

        response = requests.post(
            f"{BASE_URL}/sessions/",
            json=data
        )

        if response.status_code not in [200, 201]:

            print(
                f"Session {session_number} FAILED "
                f"({response.status_code})"
            )

            print(response.text)
            break

        print(
            f"Session {session_number:02d} created"
        )


print("\n--------------------------------")
print("Controlled test data inserted.")
print("--------------------------------")