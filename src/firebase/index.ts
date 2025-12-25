
'use client';

import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { firebaseConfig } from './config';

export function initializeFirebase() {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return {
      app: null,
      auth: null,
      firestore: null,
    };
  }

  const apps = getApps();
  const app = apps.length > 0 ? apps[0] : initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  return { app, auth, firestore };
}

export {
  useAuth,
  useFirebase,
  useFirebaseApp,
  useFirestore,
  FirebaseProvider,
} from './provider';

export { FirebaseClientProvider } from './client-provider';
