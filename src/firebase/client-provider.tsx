'use client';

import {
  type Auth,
  type FirebaseApp,
  type Firestore,
} from 'firebase/app';
import { FirebaseProvider } from './provider';

// @ts-ignore
export function FirebaseClientProvider({ children, ...props }) {
  return <FirebaseProvider {...props}>{children}</FirebaseProvider>;
}
