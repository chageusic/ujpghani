import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, googleProvider, db } from '../lib/firebase';

export type UserRole = 'SUPER_ADMIN' | 'CONTENT_MANAGER' | 'STAFF' | null;

interface AuthContextType {
  user: User | null;
  role: UserRole;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isSuperAdmin: boolean;
  isContentManager: boolean;
  isStaff: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Log the activity
        try {
          await addDoc(collection(db, 'login_logs'), {
            userId: user.uid,
            email: user.email,
            timestamp: serverTimestamp(),
            userAgent: navigator.userAgent
          });
        } catch (e) {
          console.error("Error logging activity:", e);
        }

        // Fetch role from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role as UserRole);
        } else {
          // Default role for the initial setup
          const defaultRole: UserRole = user.email === 'chageusic@gmail.com' ? 'SUPER_ADMIN' : null;
          if (defaultRole) {
            await setDoc(doc(db, 'users', user.uid), {
              email: user.email,
              displayName: user.displayName,
              role: defaultRole
            });
            setRole(defaultRole);
          } else {
            setRole(null);
          }
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      role,
      loading, 
      login, 
      logout,
      isSuperAdmin: role === 'SUPER_ADMIN',
      isContentManager: role === 'SUPER_ADMIN' || role === 'CONTENT_MANAGER',
      isStaff: role === 'SUPER_ADMIN' || role === 'CONTENT_MANAGER' || role === 'STAFF'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
