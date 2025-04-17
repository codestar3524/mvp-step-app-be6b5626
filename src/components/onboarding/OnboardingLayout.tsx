
import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/App';
import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Building2,
  Package,
  Database,
  Settings
} from 'lucide-react';

const OnboardingLayout = () => {
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  
  const steps = [
    {
      id: 1,
      title: 'Company Details',
      path: '/onboarding/step-1',
      icon: Building2
    },
    {
      id: 2, 
      title: 'Products',
      path: '/onboarding/step-2',
      icon: Package
    },
    {
      id: 3,
      title: 'Data Sources',
      path: '/onboarding/step-3',
      icon: Database
    },
    {
      id: 4,
      title: 'Preferences',
      path: '/onboarding/step-4',
      icon: Settings
    }
  ];
  
  useEffect(() => {
    const currentPath = location.pathname;
    const step = steps.find(s => s.path === currentPath);
    if (step) {
      setCurrentStep(step.id);
    }
  }, [location.pathname]);
  
  const handleNext = () => {
    const nextStep = currentStep + 1;
    if (nextStep <= steps.length) {
      navigate(`/onboarding/step-${nextStep}`);
    } else {
      completeOnboarding();
      navigate('/dashboard');
    }
  };
  
  const handlePrevious = () => {
    const prevStep = currentStep - 1;
    if (prevStep >= 1) {
      navigate(`/onboarding/step-${prevStep}`);
    }
  };
  
  const isLastStep = currentStep === steps.length;
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border py-4 px-6">
        <div className="flex items-center mb-8">
          <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">IP</span>
          </div>
          <h1 className="text-xl font-bold">InsightPilot Setup</h1>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step) => (
              <div 
                key={step.id} 
                className="flex items-center flex-col relative"
              >
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center 
                  ${step.id < currentStep 
                    ? 'bg-primary text-white' 
                    : step.id === currentStep 
                      ? 'bg-primary/10 border-2 border-primary text-primary' 
                      : 'bg-muted text-muted-foreground'}
                `}>
                  {step.id < currentStep ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <div className="text-xs mt-2 font-medium text-center max-w-[80px]">
                  {step.title}
                </div>
                {step.id < steps.length && (
                  <div className={`absolute top-5 left-[calc(100%)] w-[calc(100%-20px)] h-[2px] 
                    ${step.id < currentStep ? 'bg-primary' : 'bg-muted'}`} 
                    style={{ left: '100%', transform: 'translateX(-50%)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </header>
      
      <main className="flex-1 overflow-auto p-6 bg-background">
        <div className="max-w-3xl mx-auto">
          <Outlet />
        </div>
      </main>
      
      <footer className="border-t border-border p-6">
        <div className="max-w-3xl mx-auto flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <Button onClick={handleNext}>
            {isLastStep ? 'Complete Setup' : 'Next'}
            {!isLastStep && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default OnboardingLayout;
