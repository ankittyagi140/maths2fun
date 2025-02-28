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
  signInWithPopup
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
        setLoading(false);
      if (error instanceof Error) {
       throw error;
      } else {
     throw new Error("An unexpected error occurred");
      }
    }
    );
    
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
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
