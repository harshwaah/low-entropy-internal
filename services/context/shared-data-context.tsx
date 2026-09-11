'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import {
  Patient,
  Memory,
  Reminder,
  Activity,
  Observation,
  Alert,
  Caregiver,
  Practitioner,
  LoveNote,
  ReminderStatus,
} from '@/types/models';
import {
  patientService,
  memoryService,
  reminderService,
  activityService,
  observationService,
  caregiverService,
  practitionerService,
  alertService,
  loveNoteService,
  seedService,
} from '@/services/firestore';
import {
  SEED_PATIENTS,
  SEED_MEMORIES,
  SEED_REMINDERS,
  SEED_ACTIVITIES,
  SEED_OBSERVATIONS,
  SEED_ALERTS,
  SEED_CAREGIVERS,
  SEED_PRACTITIONERS,
} from '@/services/seed/demo-seed-data';

interface SharedDataContextType {
  patients: Patient[];
  selectedPatientId: string;
  setSelectedPatientId: (id: string) => void;
  selectedPatient: Patient | null;
  memories: Memory[];
  reminders: Reminder[];
  activities: Activity[];
  observations: Observation[];
  alerts: Alert[];
  caregivers: Caregiver[];
  practitioners: Practitioner[];
  isInitialized: boolean;
  isLoading: boolean;

  // Connected cross-portal actions
  markReminderCompleted: (reminderId: string, completedBy?: string) => Promise<void>;
  toggleReminderStatus: (reminderId: string, newStatus: ReminderStatus, completedBy?: string) => Promise<void>;
  createReminder: (reminder: Reminder) => Promise<void>;
  updateReminder: (id: string, updates: Partial<Reminder>) => Promise<void>;
  deleteReminder: (id: string) => Promise<void>;
  addMemory: (memory: Memory) => Promise<void>;
  updateMemory: (id: string, updates: Partial<Memory>) => Promise<void>;
  addLoveNote: (memoryId: string, note: LoveNote) => Promise<void>;
  logActivity: (activity: Activity) => Promise<void>;
  addObservation: (observation: Observation) => Promise<void>;
  acknowledgeAlert: (alertId: string) => Promise<void>;
  reseedData: () => Promise<void>;
}

const SharedDataContext = createContext<SharedDataContextType | null>(null);

export function SharedDataProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>(SEED_PATIENTS);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('p-101');
  const [memories, setMemories] = useState<Memory[]>(SEED_MEMORIES);
  const [reminders, setReminders] = useState<Reminder[]>(SEED_REMINDERS);
  const [activities, setActivities] = useState<Activity[]>(SEED_ACTIVITIES);
  const [observations, setObservations] = useState<Observation[]>(SEED_OBSERVATIONS);
  const [alerts, setAlerts] = useState<Alert[]>(SEED_ALERTS);
  const [caregivers, setCaregivers] = useState<Caregiver[]>(SEED_CAREGIVERS);
  const [practitioners, setPractitioners] = useState<Practitioner[]>(SEED_PRACTITIONERS);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize seed data if empty
  useEffect(() => {
    let isMounted = true;
    async function initDb() {
      try {
        await seedService.seedDatabaseIfEmpty();
        if (isMounted) setIsInitialized(true);
      } catch (err) {
        console.warn('Initial seed check error:', err);
        if (isMounted) setIsInitialized(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    initDb();
    return () => {
      isMounted = false;
    };
  }, []);

  // Real-time listener for Patients
  useEffect(() => {
    const unsub = patientService.subscribeToPatients((livePatients) => {
      if (livePatients && livePatients.length > 0) {
        setPatients(livePatients);
      }
    });
    return () => unsub();
  }, []);

  // Real-time listener for Memories
  useEffect(() => {
    const unsub = memoryService.subscribeToMemories(selectedPatientId, (liveMemories) => {
      if (liveMemories && liveMemories.length > 0) {
        setMemories(liveMemories);
      }
    });
    return () => unsub();
  }, [selectedPatientId]);

  // Real-time listener for Reminders
  useEffect(() => {
    const unsub = reminderService.subscribeToReminders(selectedPatientId, (liveReminders) => {
      if (liveReminders && liveReminders.length > 0) {
        setReminders(liveReminders);
      }
    });
    return () => unsub();
  }, [selectedPatientId]);

  // Real-time listener for Activities
  useEffect(() => {
    const unsub = activityService.subscribeToActivities(selectedPatientId, (liveActivities) => {
      if (liveActivities && liveActivities.length > 0) {
        setActivities(liveActivities);
      }
    });
    return () => unsub();
  }, [selectedPatientId]);

  // Real-time listener for Observations
  useEffect(() => {
    const unsub = observationService.subscribeToObservations(selectedPatientId, (liveObservations) => {
      if (liveObservations && liveObservations.length > 0) {
        setObservations(liveObservations);
      }
    });
    return () => unsub();
  }, [selectedPatientId]);

  // Real-time listener for Alerts
  useEffect(() => {
    const unsub = alertService.subscribeToAlerts(selectedPatientId, (liveAlerts) => {
      if (liveAlerts && liveAlerts.length > 0) {
        setAlerts(liveAlerts);
      }
    });
    return () => unsub();
  }, [selectedPatientId]);

  // Real-time listener for Caregivers & Practitioners
  useEffect(() => {
    const unsubCg = caregiverService.subscribeToCaregivers((liveCgs) => {
      if (liveCgs && liveCgs.length > 0) setCaregivers(liveCgs);
    });
    const unsubPr = practitionerService.subscribeToPractitioners((livePrs) => {
      if (livePrs && livePrs.length > 0) setPractitioners(livePrs);
    });
    return () => {
      unsubCg();
      unsubPr();
    };
  }, []);

  // Current selected patient
  const selectedPatient = useMemo(() => {
    return patients.find((p) => p.id === selectedPatientId) || patients[0] || null;
  }, [patients, selectedPatientId]);

  // Action: Mark reminder completed (single source of truth for patient, caregiver, practitioner)
  const markReminderCompleted = useCallback(
    async (reminderId: string, completedBy?: string) => {
      const now = new Date();
      const timeFormatted = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      const who = completedBy || (selectedPatient ? `${selectedPatient.name} (Patient App)` : 'Patient');

      // 1. Update state optimistically
      setReminders((prev) =>
        prev.map((r) =>
          r.id === reminderId
            ? { ...r, status: 'completed', completedAt: timeFormatted, completedBy: who }
            : r
        )
      );

      // Find the reminder item for activity logging
      const reminderItem = reminders.find((r) => r.id === reminderId);
      const title = reminderItem?.title || 'Routine Task';

      // 2. Persist in Firestore Reminder collection
      try {
        await reminderService.toggleReminderStatus(reminderId, 'completed', who);
      } catch (err) {
        console.warn('Persisting reminder completion to Firestore failed, updated locally:', err);
      }

      // 3. Automatically log an Activity record for caregiver/practitioner views
      const newActivity: Activity = {
        id: `act-${Date.now()}`,
        patientId: selectedPatientId,
        type: reminderItem?.category === 'medication' ? 'routine' : 'routine',
        title: `Completed: ${title}`,
        category: reminderItem?.category === 'medication' ? 'Medication Compliance' : 'Daily Rhythm',
        time: timeFormatted,
        timestamp: now.toISOString(),
        status: 'completed',
        score: 100,
        description: `${who} confirmed completion of ${title}.`,
        companionFeedback: 'Logged automatically to shared care record.',
        cognitiveDomain: 'executive',
        createdAt: now.toISOString(),
      };

      setActivities((prev) => [newActivity, ...prev]);

      try {
        await activityService.logActivity(newActivity);
      } catch (err) {
        console.warn('Logging activity to Firestore failed, updated locally:', err);
      }
    },
    [reminders, selectedPatient, selectedPatientId]
  );

  // Action: Toggle reminder status (completed, pending, upcoming)
  const toggleReminderStatus = useCallback(
    async (reminderId: string, newStatus: ReminderStatus, completedBy?: string) => {
      const now = new Date();
      const timeFormatted = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

      setReminders((prev) =>
        prev.map((r) =>
          r.id === reminderId
            ? {
                ...r,
                status: newStatus,
                completedAt: newStatus === 'completed' ? timeFormatted : undefined,
                completedBy: newStatus === 'completed' ? (completedBy || 'Caregiver') : undefined,
              }
            : r
        )
      );

      try {
        await reminderService.toggleReminderStatus(reminderId, newStatus, completedBy);
      } catch (err) {
        console.warn('toggleReminderStatus in Firestore failed, state kept in sync locally:', err);
      }
    },
    []
  );

  // Action: Create Reminder
  const createReminder = useCallback(
    async (reminder: Reminder) => {
      setReminders((prev) => [reminder, ...prev]);
      try {
        await reminderService.createReminder(reminder);
      } catch (err) {
        console.warn('createReminder in Firestore failed, state kept locally:', err);
      }
    },
    []
  );

  // Action: Update Reminder
  const updateReminder = useCallback(
    async (id: string, updates: Partial<Reminder>) => {
      setReminders((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r))
      );
      try {
        await reminderService.updateReminder(id, updates);
      } catch (err) {
        console.warn('updateReminder in Firestore failed, updated locally:', err);
      }
    },
    []
  );

  // Action: Delete Reminder
  const deleteReminder = useCallback(
    async (id: string) => {
      setReminders((prev) => prev.filter((r) => r.id !== id));
      try {
        await reminderService.deleteReminder(id);
      } catch (err) {
        console.warn('deleteReminder in Firestore failed, deleted locally:', err);
      }
    },
    []
  );

  // Action: Add Memory
  const addMemory = useCallback(
    async (memory: Memory) => {
      setMemories((prev) => [memory, ...prev]);
      try {
        await memoryService.createMemory(memory);
      } catch (err) {
        console.warn('addMemory in Firestore failed, saved locally:', err);
      }
    },
    []
  );

  // Action: Update Memory
  const updateMemory = useCallback(
    async (id: string, updates: Partial<Memory>) => {
      setMemories((prev) =>
        prev.map((m) => (m.id === id ? { ...m, ...updates, updatedAt: new Date().toISOString() } : m))
      );
      try {
        await memoryService.updateMemory(id, updates);
      } catch (err) {
        console.warn('updateMemory in Firestore failed, updated locally:', err);
      }
    },
    []
  );

  // Action: Add LoveNote
  const addLoveNote = useCallback(
    async (memoryId: string, note: LoveNote) => {
      setMemories((prev) =>
        prev.map((m) => {
          if (m.id === memoryId) {
            return {
              ...m,
              familyNotes: [...(m.familyNotes || []), note],
            };
          }
          return m;
        })
      );
      try {
        await memoryService.addFamilyNote(memoryId, note);
        await loveNoteService.sendLoveNote(note);
      } catch (err) {
        console.warn('addLoveNote in Firestore failed, saved locally:', err);
      }
    },
    []
  );

  // Action: Log Activity
  const logActivity = useCallback(
    async (activity: Activity) => {
      setActivities((prev) => [activity, ...prev]);
      try {
        await activityService.logActivity(activity);
      } catch (err) {
        console.warn('logActivity in Firestore failed, saved locally:', err);
      }
    },
    []
  );

  // Action: Add Clinical Observation
  const addObservation = useCallback(
    async (observation: Observation) => {
      setObservations((prev) => [observation, ...prev]);
      try {
        await observationService.createObservation(observation);
      } catch (err) {
        console.warn('addObservation in Firestore failed, saved locally:', err);
      }
    },
    []
  );

  // Action: Acknowledge Alert
  const acknowledgeAlert = useCallback(
    async (alertId: string) => {
      setAlerts((prev) =>
        prev.map((a) => (a.id === alertId ? { ...a, acknowledged: true } : a))
      );
      try {
        await alertService.acknowledgeAlert(alertId);
      } catch (err) {
        console.warn('acknowledgeAlert in Firestore failed, updated locally:', err);
      }
    },
    []
  );

  // Action: Force reseed
  const reseedData = useCallback(async () => {
    setIsLoading(true);
    try {
      await seedService.forceReSeedDatabase();
      setPatients(SEED_PATIENTS);
      setMemories(SEED_MEMORIES);
      setReminders(SEED_REMINDERS);
      setActivities(SEED_ACTIVITIES);
      setObservations(SEED_OBSERVATIONS);
      setAlerts(SEED_ALERTS);
      setCaregivers(SEED_CAREGIVERS);
      setPractitioners(SEED_PRACTITIONERS);
    } catch (err) {
      console.error('reseedData failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      patients,
      selectedPatientId,
      setSelectedPatientId,
      selectedPatient,
      memories,
      reminders,
      activities,
      observations,
      alerts,
      caregivers,
      practitioners,
      isInitialized,
      isLoading,
      markReminderCompleted,
      toggleReminderStatus,
      createReminder,
      updateReminder,
      deleteReminder,
      addMemory,
      updateMemory,
      addLoveNote,
      logActivity,
      addObservation,
      acknowledgeAlert,
      reseedData,
    }),
    [
      patients,
      selectedPatientId,
      selectedPatient,
      memories,
      reminders,
      activities,
      observations,
      alerts,
      caregivers,
      practitioners,
      isInitialized,
      isLoading,
      markReminderCompleted,
      toggleReminderStatus,
      createReminder,
      updateReminder,
      deleteReminder,
      addMemory,
      updateMemory,
      addLoveNote,
      logActivity,
      addObservation,
      acknowledgeAlert,
      reseedData,
    ]
  );

  return <SharedDataContext.Provider value={value}>{children}</SharedDataContext.Provider>;
}

export function useSharedData() {
  const context = useContext(SharedDataContext);
  if (!context) {
    throw new Error('useSharedData must be used within a SharedDataProvider');
  }
  return context;
}
