import { createContext, useState, useEffect } from 'react';
import { User } from '@/lib/mock-data';

// TODO: Replace with Supabase Auth
// import { createClient } from '@supabase/supabase-js';
// const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    const storedUser = localStorage.getItem('lovable-auth-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);

    // TODO: Replace with Supabase auth listener
    // const { data: { subscription } } = supabase.auth.onAuthStateChange(
    //   async (event, session) => {
    //     if (session?.user) {
    //       const { data: profile } = await supabase
    //         .from('users')
    //         .select('*')
    //         .eq('id', session.user.id)
    //         .single();
    //       setUser(profile);
    //     } else {
    //       setUser(null);
    //     }
    //     setIsLoading(false);
    //   }
    // );
    // return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual Supabase auth
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email,
      //   password,
      // });
      // if (error) throw error;

      // Mock login
      const mockUser = {
        id: 'user-1',
        name: 'Alex Costa',
        email,
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        xp: 1250,
        currentLevel: 'n5',
        badges: ['first-lesson'],
        joinedAt: new Date().toISOString(),
        streak: 3
      };
      setUser(mockUser);
      localStorage.setItem('lovable-auth-user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual Supabase auth
      // const { data, error } = await supabase.auth.signUp({
      //   email,
      //   password,
      //   options: {
      //     data: { name }
      //   }
      // });
      // if (error) throw error;

      // Mock signup
      const mockUser = {
        id: 'user-new',
        name,
        email,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        xp: 0,
        currentLevel: 'n5',
        badges: [],
        joinedAt: new Date().toISOString(),
        streak: 0
      };
      setUser(mockUser);
      localStorage.setItem('lovable-auth-user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual Supabase auth
      // const { error } = await supabase.auth.signOut();
      // if (error) throw error;

      setUser(null);
      localStorage.removeItem('lovable-auth-user');
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    // TODO: Replace with actual Supabase auth
    // const { error } = await supabase.auth.resetPasswordForEmail(email, {
    //   redirectTo: `${window.location.origin}/reset-password`,
    // });
    // if (error) throw error;
    
    console.log('Password reset email sent to:', email);
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}