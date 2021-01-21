import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';

// navigation
import AppNavigator from './src/navigation/AppNavigator';

import env from './env.json';

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
  measurementId: env.FIREBASE_MEASUREMENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return <AppNavigator />;
}
