import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Onboarding from './components/Onboarding';
import AuthScreen from './components/AuthScreen';
import Dashboard from './components/Dashboard';
import { supabase, getCurrentUser } from './lib/supabase';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [onboardingComplete, setOnboardingComplete] = useState(() => {
    return localStorage.getItem('onboardingComplete') === 'true';
  });
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser || null);
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem('onboardingComplete', 'true');
    setOnboardingComplete(true);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            !onboardingComplete ? (
              <Onboarding onComplete={completeOnboarding} />
            ) : user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthScreen />
            )
          } 
        />
        <Route 
          path="/auth" 
          element={user ? <Navigate to="/dashboard" replace /> : <AuthScreen />} 
        />
        <Route 
          path="/dashboard/*" 
          element={user ? <Dashboard user={user} /> : <Navigate to="/auth" replace />} 
        />
      </Routes>
    </Router>
  );
}

export default App;