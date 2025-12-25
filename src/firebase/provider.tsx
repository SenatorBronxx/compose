
'use client';

import {
  createContext,
  use,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { initializeFirebase } from './index';

const FirebaseContext = createContext(null);

export function FirebaseProvider({ children, ...props }) {
  // @ts-ignore
  const { ...rest } = props;
  const [firebase, setFirebase] = useState(initializeFirebase);

  const sdk = useMemo(
    () => ({
      ...firebase,
    }),
    [firebase]
  );

  return (
    <FirebaseContext.Provider
      // @ts-ignore
      value={sdk}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export const useFirebaseApp = () => {
  // @ts-ignore
  const { app } = useFirebase();
  return app;
};

export const useFirestore = () => {
  // @ts-ignore
  const { firestore } = useFirebase();
  return firestore;
};

export const useAuth = () => {
  // @ts-ignore
  const { auth } = useFirebase();
  return auth;
};
