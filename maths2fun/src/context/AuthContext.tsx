'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
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

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  googleLogin: () => Promise<void>;
  message:string,
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
  message:"",
  isAuth:false
});

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const[message,setMessage] = useState("");
  const [isAuth,setIsAuth] = useState<boolean>(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth, 
      (user) => {
        setUser(user);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        console.log(error)
      }
    );
    
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    setIsAuth(true)
    } catch (error:any) {
      console.log(error)
      setLoading(false);
      throw error;
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      setLoading(true);
       await createUserWithEmailAndPassword(auth, email, password);
    } catch (error:any) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setIsAuth(false);
    } catch (error:any) {
      setLoading(false);
      throw error;
    }
  };

  const googleLogin = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        setIsAuth(true)
    } catch (error:any) {
      setLoading(false);
      throw error;
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
        message,
        isAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
