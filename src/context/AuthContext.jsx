import React, { createContext, useContext, useState, useEffect } from 'react';
import { isSupabaseConfigured, supabase } from '../config/supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return undefined;
    }

    // Get initial session
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchUserRole(session.user);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Unable to restore session:', error?.message || error);
        setLoading(false);
      });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserRole(session.user);
      } else {
        setRole(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    // Listen securely over postgres socket pipelines mapped strictly to the individual active user
    const channel = supabase
      .channel(`user-roles-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*', // Listen for any external Update/Insert payloads
          schema: 'public',
          table: 'user_roles',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          if (payload.new && payload.new.role) {
            console.log("Supabase Realtime External Delta Detected:", payload.new.role);
            if (payload.new.role === 'blocked') {
                alert("CRITICAL SECURITY VIOLATION: An Administrator has completely banned your account. Executing forced log-out sequence.");
                supabase.auth.signOut().then(() => setRole(null));
                return;
            }
            setRole(payload.new.role);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchUserRole = async (userObj) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userObj.id);
      
      if (error) {
          alert(`SUPABASE SECURITY ERROR: ${error.message}\nYour database Row Level Security is actively blocking the website from reading your role! Please re-run the CREATE POLICY command alone.`);
          throw error;
      }
      
      if (data && data.length > 0) {
          // Aggressively scan for elevated permission markers if multiple rows are detected
          const hasAdmin = data.some(r => r.role === 'admin');
          const hasBlocked = data.some(r => r.role === 'blocked');
          const finalRole = hasBlocked ? 'blocked' : (hasAdmin ? 'admin' : data[data.length - 1].role);
          
          if (finalRole === 'blocked') {
              alert("CRITICAL SECURITY VIOLATION: Your identity profile has been permanently suspended by global administrators. Access denied.");
              await supabase.auth.signOut();
              setRole(null);
              return;
          }
          
          console.log("Database successfully isolated active role:", finalRole);
          setRole(finalRole);
      } else {
          console.log("Database returned no roles, falling back to metadata:", userObj.user_metadata?.role);
          setRole(userObj.user_metadata?.role || 'buyer'); 
      }
    } catch (error) {
      console.error('CRITICAL: Error fetching role securely mapped to identity:', error.message);
      setRole(userObj.user_metadata?.role || 'buyer'); // Fallback to metadata
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    role,
    loading,
    signOut: () => supabase.auth.signOut(),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
