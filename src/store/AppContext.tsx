import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Candidate, Job, Task, Recruiter } from '../types';
import { MOCK_CANDIDATES, MOCK_JOBS, MOCK_TASKS } from '../constants';
import { 
  auth, 
  db, 
  onAuthStateChanged, 
  onSnapshot, 
  collection, 
  doc, 
  setDoc, 
  googleProvider, 
  signInWithPopup, 
  signOut,
  FirebaseUser,
  testFirestoreConnection,
  query,
  where
} from '../lib/firebase';
import { updateDoc, addDoc, deleteDoc } from 'firebase/firestore';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface AppContextType {
  candidates: Candidate[];
  jobs: Job[];
  tasks: Task[];
  currentUser: Recruiter | null;
  authReady: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  updateCandidateStatus: (id: string, status: any) => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'ownerId'>) => Promise<void>;
  toggleTask: (id: string, completed: boolean) => Promise<void>;
  updateCandidateSummary: (id: string, summary: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentUser, setCurrentUser] = useState<Recruiter | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    testFirestoreConnection();
    
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Sync user profile
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'Recruiter',
          email: firebaseUser.email || '',
          role: 'Senior Executive Recruiter',
          avatar: firebaseUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.uid}`,
          activeJobs: 0,
          placementsThisMonth: 0
        };
        
        try {
          await setDoc(userDocRef, userDoc, { merge: true });
          setCurrentUser(userDoc);
        } catch (err) {
          console.error("User profile sync error:", err);
        }

        // Setup real-time listeners
        const unsubCandidates = onSnapshot(collection(db, 'candidates'), (snapshot) => {
          const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Candidate));
          if (list.length === 0 && firebaseUser) {
             // Seed data if empty (only for this user's initial experience)
             seedInitialData(firebaseUser.uid);
          }
          setCandidates(list);
        }, (err) => handleFirestoreError(err, OperationType.LIST, 'candidates'));

        const unsubJobs = onSnapshot(collection(db, 'jobs'), (snapshot) => {
          const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Job));
          if (list.length === 0 && firebaseUser) {
            seedInitialJobs(firebaseUser.uid);
          }
          setJobs(list);
        }, (err) => handleFirestoreError(err, OperationType.LIST, 'jobs'));

        const unsubTasks = onSnapshot(query(collection(db, 'tasks'), where('ownerId', '==', firebaseUser.uid)), (snapshot) => {
          const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Task));
          if (list.length === 0 && firebaseUser) {
            seedInitialTasks(firebaseUser.uid);
          }
           setTasks(list);
        }, (err) => handleFirestoreError(err, OperationType.LIST, 'tasks'));

        setAuthReady(true);
        return () => {
          unsubCandidates();
          unsubJobs();
          unsubTasks();
        };
      } else {
        setCurrentUser(null);
        setCandidates([]);
        setJobs([]);
        setTasks([]);
        setAuthReady(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const seedInitialData = async (uid: string) => {
    try {
      for (const c of MOCK_CANDIDATES) {
        const { id, ...data } = c;
        await setDoc(doc(db, 'candidates', id), { ...data, ownerId: uid });
      }
    } catch (err) {
      console.error("Seeding error:", err);
    }
  };

  const seedInitialJobs = async (uid: string) => {
    try {
      for (const j of MOCK_JOBS) {
        const { id, ...data } = j;
        await setDoc(doc(db, 'jobs', id), { ...data, ownerId: uid });
      }
    } catch (err) {
      console.error("Seeding error:", err);
    }
  };

  const seedInitialTasks = async (uid: string) => {
    try {
      for (const t of MOCK_TASKS) {
        const { id, ...data } = t;
        await setDoc(doc(db, 'tasks', id), { ...data, ownerId: uid });
      }
    } catch (err) {
      console.error("Seeding error:", err);
    }
  };

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const updateCandidateStatus = async (id: string, status: any) => {
    const path = `candidates/${id}`;
    try {
      await updateDoc(doc(db, 'candidates', id), { status });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  };

  const updateCandidateSummary = async (id: string, summary: string) => {
    const path = `candidates/${id}`;
    try {
      await updateDoc(doc(db, 'candidates', id), { aiSummary: summary });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  };

  const addTask = async (task: Omit<Task, 'id' | 'ownerId'>) => {
    if (!auth.currentUser) return;
    const path = 'tasks';
    try {
      await addDoc(collection(db, 'tasks'), {
        ...task,
        ownerId: auth.currentUser.uid,
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  };

  const toggleTask = async (id: string, completed: boolean) => {
    const path = `tasks/${id}`;
    try {
      await updateDoc(doc(db, 'tasks', id), { completed });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  };

  return (
    <AppContext.Provider value={{ 
      candidates, 
      jobs, 
      tasks, 
      currentUser,
      authReady,
      login,
      logout,
      updateCandidateStatus,
      updateCandidateSummary,
      addTask,
      toggleTask
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
