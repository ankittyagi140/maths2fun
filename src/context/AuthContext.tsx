'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/firebase/firebase-config';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  Auth
} from 'firebase/auth';
import React from 'react';

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  googleLogin: () => Promise<void>;
  isAuth:boolean
};

// Helper function to check if Firebase auth is properly configured
const isFirebaseAuthConfigured = (authInstance: any): authInstance is Auth => {
  return authInstance && 
         typeof authInstance.onAuthStateChanged === 'function' &&
         typeof authInstance.signInWithEmailAndPassword === 'function';
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  googleLogin: async () => {},
  isAuth:false
});

export function AuthProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuth,setIsAuth] = useState<boolean>(false)

  useEffect(() => {
    // Check if auth is properly initialized
    if (!isFirebaseAuthConfigured(auth)) {
      console.warn('⚠️ Firebase auth not properly configured. Running in demo mode.');
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(
      auth, 
      (user) => {
        setUser(user);
        setLoading(false);
        if(user){
          setIsAuth(true)
        }
      },
      (error:unknown) => {
        console.error('Auth state change error:', error);
        setLoading(false);
        // Don't throw error, just log it
      }
    );
    
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      if (!isFirebaseAuthConfigured(auth)) {
        throw new Error('Firebase authentication is not configured. Please check your environment variables.');
      }
      
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false)
      setIsAuth(true)
    } catch (error:unknown) {
      setLoading(false);
      if (error instanceof Error) {
       throw error;
      } else {
     throw new Error("An unexpected error occurred");
      }
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      if (!isFirebaseAuthConfigured(auth)) {
        throw new Error('Firebase authentication is not configured. Please check your environment variables.');
      }
      
      setLoading(true);
       await createUserWithEmailAndPassword(auth, email, password);
       setLoading(false)
    } catch (error:unknown) {
      setLoading(false)
      if (error instanceof Error) {
        throw error;
       } else {
      throw new Error("An unexpected error occurred");
       }
    }
  };

  const logout = async () => {
    try {
      if (!isFirebaseAuthConfigured(auth)) {
        throw new Error('Firebase authentication is not configured. Please check your environment variables.');
      }
      
      setLoading(true);
      await signOut(auth);
      setIsAuth(false);
      setLoading(false)
    } catch (error:unknown) {
      setLoading(false)
      if (error instanceof Error) {
        throw error;
       } else {
      throw new Error("An unexpected error occurred");
       }
    }
  };

  const googleLogin = async () => {
    try {
      if (!isFirebaseAuthConfigured(auth)) {
        throw new Error('Firebase authentication is not configured. Please check your environment variables.');
      }
      
      setLoading(true);
      const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        setIsAuth(true)
        setLoading(false)
    } catch (error:unknown) {
      setLoading(false)
      if (error instanceof Error) {
        throw error;
       } else {
      throw new Error("An unexpected error occurred");
       }
    }
  };

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        loading, 
        login, 
        signup, 
        logout, 
        googleLogin,
        isAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
