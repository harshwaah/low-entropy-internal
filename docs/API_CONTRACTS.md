# SmritiSaathi API & Service Contracts

This document defines the interface specifications between frontend feature modules and future backend / server-side AI services.

---

## 1. Server-Side AI Companion API

**Endpoint**: `POST /api/companion/chat`  
**Security**: Server-side only via `process.env.GEMINI_API_KEY`.

### Request Body
```typescript
interface CompanionChatRequest {
  patientId: string;
  patientNickname: string;
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  currentMoodContext?: 'calm' | 'cheerful' | 'pensive' | 'confused' | 'anxious';
  userUtterance?: string;
  triggeredMemoryId?: string;
}
```

### Response Body
```typescript
interface CompanionChatResponse {
  displayText: string;
  audioSsml?: string;
  suggestedAction?: {
    actionType: 'open_memory' | 'suggest_routine' | 'call_caregiver';
    targetId?: string;
    label: string;
  };
  emotionalTone: 'soothing' | 'cheerful' | 'gentle_clarification' | 'validating';
}
```

---

## 2. Telemetry & Analytics Event Contract

**Endpoint**: `POST /api/analytics/event`

### Event Payload
```typescript
interface TelemetryEventPayload {
  eventType: 'session_start' | 'memory_view' | 'routine_check' | 'game_complete' | 'confusion_reported';
  patientId: string;
  role: 'patient' | 'caregiver' | 'practitioner';
  timestamp: string;
  metadata?: {
    durationSeconds?: number;
    activityType?: string;
    perceivedFrustrationFlag?: boolean;
    medicationConfirmed?: boolean;
  };
}
```

---

## 3. Routine Schedule Management Contract

**Endpoint**: `GET /api/routines?patientId=:id&date=:date`

### Response Payload
```typescript
interface DailyRoutineResponse {
  patientId: string;
  date: string;
  tasks: Array<{
    id: string;
    title: string;
    period: 'morning' | 'afternoon' | 'evening' | 'bedtime';
    targetTimeFormatted: string;
    instructionPrompt: string;
    isMedication: boolean;
    requiresCaregiverValidation: boolean;
    completedAt?: string;
  }>;
}
```
