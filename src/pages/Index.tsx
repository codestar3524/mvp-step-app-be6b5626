
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '../App';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isOnboarded } = useAuth();
  const [searchParams] = useSearchParams();
  const [showRegister, setShowRegister] = useState(false);
  
  useEffect(() => {
    // Check if register param is in URL
    const registerParam = searchParams.get('register');
    if (registerParam === 'true') {
      setShowRegister(true);
    }
    
    // Redirect if already authenticated
    if (isAuthenticated) {
      if (!isOnboarded) {
        navigate('/onboarding/step-1');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, isOnboarded, navigate, searchParams]);
  
  return (
    <AuthLayout
      title={showRegister ? "Create Your Account" : "Welcome Back"}
      subtitle={
        showRegister
          ? "Sign up to start using InsightPilot Nexus"
          : "Sign in to your account to continue"
      }
    >
      {showRegister ? <RegisterForm /> : <LoginForm />}
    </AuthLayout>
  );
};

export default Index;
