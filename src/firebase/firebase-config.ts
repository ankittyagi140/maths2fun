import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "demo-app-id"
};

// Check if we're in development and Firebase config is not properly set
const isDevelopment = process.env.NODE_ENV === 'development';
const hasValidConfig = process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
                      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN && 
                      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

if (isDevelopment && !hasValidConfig) {
  console.warn('⚠️ Firebase configuration not found. Please create a .env.local file with your Firebase credentials.');
  console.warn('📝 Create a .env.local file in your project root with the following variables:');
  console.warn('   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key');
  console.warn('   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com');
  console.warn('   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id');
  console.warn('   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com');
  console.warn('   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id');
  console.warn('   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id');
}

// Initialize Firebase
let app;
let auth;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  
  // Create a mock auth object for development
  if (isDevelopment) {
    auth = {
      currentUser: null,
      onAuthStateChanged: (callback: any) => {
        callback(null);
        return () => {};
      },
      signInWithEmailAndPassword: async () => {
        throw new Error('Firebase not configured');
      },
      createUserWithEmailAndPassword: async () => {
        throw new Error('Firebase not configured');
      },
      signOut: async () => {
        throw new Error('Firebase not configured');
      }
    } as any;
  } else {
    throw error;
  }
}

export { app };
export { auth }; 