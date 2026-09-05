/**
 * Storage Abstraction Layer Scaffolding
 * 
 * Future-proofs data access, allowing seamless transition from in-memory/localStorage
 * to Firestore or PostgreSQL/Cloud SQL in subsequent hackathon phases.
 */

export interface IStorageAdapter<T> {
  get(key: string): Promise<T | null>;
  set(key: string, value: T): Promise<void>;
  delete(key: string): Promise<void>;
  list(prefix?: string): Promise<T[]>;
}

export class MemoryStorageAdapter<T> implements IStorageAdapter<T> {
  private store = new Map<string, T>();

  async get(key: string): Promise<T | null> {
    return this.store.get(key) || null;
  }

  async set(key: string, value: T): Promise<void> {
    this.store.set(key, value);
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }

  async list(): Promise<T[]> {
    return Array.from(this.store.values());
  }
}
