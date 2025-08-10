"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/firebase/config";
import {
  createUserWithEmailAndPassword,
  PasswordValidationStatus,
  signInWithEmailAndPassword,
  User,
  UserCredential,
  validatePassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";

interface AuthContextType {
  currentUser: User | null;
  signup: (email: string, password: string) => Promise<UserCredential>;
  validate: (password: string) => Promise<PasswordValidationStatus>;
  verifyEmail: (user: User) => Promise<void>;
  login: (email: string, password: string) => Promise<UserCredential>;
  signout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function validate(password: string) {
    return validatePassword(auth, password);
  }

  function verifyEmail(user: User) {
    return sendEmailVerification(user);
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.emailVerified) {
        setCurrentUser(user);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const authContextValue = {
    currentUser,
    signup,
    validate,
    verifyEmail,
    login,
    signout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
