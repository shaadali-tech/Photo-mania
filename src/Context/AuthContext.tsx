import { createContext, useContext, useEffect, useState } from "react";

import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase.ts";

// Type of data we want to store globally
type AuthContextType = {
  user: User | null;
  loading: boolean;
};

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Store logged-in user
  const [user, setUser] = useState<User | null>(null);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Runs when app starts
  useEffect(() => {
    // Firebase checks if user is logged in
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Save user
      setUser(currentUser);

      // Stop loading
      setLoading(false);
    });

    // Cleanup
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
