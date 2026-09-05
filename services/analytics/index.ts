/**
 * Telemetry & Cognitive Progression Event Scaffolding
 * 
 * Clinical audit trails and engagement tracking.
 */

export interface TelemetryEvent {
  eventType: 'session_start' | 'memory_view' | 'routine_check' | 'game_complete' | 'confusion_reported';
  patientId: string;
  role: 'patient' | 'caregiver' | 'practitioner';
  payload?: Record<string, unknown>;
  timestamp: string;
}

export interface IAnalyticsService {
  trackEvent(event: Omit<TelemetryEvent, 'timestamp'>): void;
}

export const analyticsService: IAnalyticsService = {
  trackEvent(event) {
    if (process.env.NODE_ENV !== 'production') {
      // Diagnostic log in development
      console.info('[Telemetry Scaffolding]:', event.eventType, event.role);
    }
  },
};
