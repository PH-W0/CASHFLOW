import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { auth, googleProvider, facebookProvider, githubProvider, appleProvider } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

interface User {
  uid: string;              // Firebase UID
  username: string | null;  // displayName
  email: string | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  loginWithGitHub: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          username: firebaseUser.displayName,
          email: firebaseUser.email,
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = credential.user;
      setUser({
        uid: firebaseUser.uid,
        username: firebaseUser.displayName,
        email: firebaseUser.email,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = credential.user;

      if (firebaseUser) {
        await updateProfile(firebaseUser, { displayName: username });
      }

      setUser({
        uid: firebaseUser.uid,
        username,
        email: firebaseUser.email,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithPopup = async (provider: any) => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      setUser({
        uid: firebaseUser.uid,
        username: firebaseUser.displayName,
        email: firebaseUser.email,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        loginWithGoogle: () => loginWithPopup(googleProvider),
        loginWithFacebook: () => loginWithPopup(facebookProvider),
        loginWithGitHub: () => loginWithPopup(githubProvider),
        loginWithApple: () => loginWithPopup(appleProvider),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
