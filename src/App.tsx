
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext, useContext } from "react";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Innovation from "./pages/Innovation";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import OnboardingLayout from "./components/onboarding/OnboardingLayout";
import StepOne from "./components/onboarding/StepOne";
import StepTwo from "./components/onboarding/StepTwo";
import StepThree from "./components/onboarding/StepThree";
import StepFour from "./components/onboarding/StepFour";

// Types
import { Profile } from "./lib/types";

// Auth context
type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  user: { name: string; email: string } | null;
  activeProfile: Profile | null;
  setActiveProfile: (profile: Profile) => void;
  profiles: Profile[];
  isOnboarded: boolean;
  completeOnboarding: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  user: null,
  activeProfile: null,
  setActiveProfile: () => {},
  profiles: [],
  isOnboarded: false,
  completeOnboarding: () => {},
});

export const useAuth = () => useContext(AuthContext);

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

// Onboarding check route
const OnboardingCheck = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isOnboarded } = useAuth();
  
  if (isAuthenticated && !isOnboarded) {
    return <Navigate to="/onboarding/step-1" />;
  }
  
  return <>{children}</>;
};

const demoProfiles: Profile[] = [
  {
    id: "1",
    name: "TechCorp Inc.",
    logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?fit=crop&w=40&h=40",
    industry: "Technology",
    productsCount: 12,
    insights: 243,
  },
  {
    id: "2",
    name: "Innovate Solutions",
    logo: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?fit=crop&w=40&h=40",
    industry: "Consulting",
    productsCount: 5,
    insights: 118,
  }
];

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [profiles] = useState<Profile[]>(demoProfiles);

  const login = async (email: string, password: string) => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsAuthenticated(true);
        setUser({
          name: "Demo User",
          email: email,
        });
        setActiveProfile(demoProfiles[0]);
        resolve();
      }, 1000);
    });
  };

  const register = async (email: string, password: string, name: string) => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsAuthenticated(true);
        setUser({
          name: name,
          email: email,
        });
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setActiveProfile(null);
    setIsOnboarded(false);
  };

  const completeOnboarding = () => {
    setIsOnboarded(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider
        value={{
          isAuthenticated,
          login,
          register,
          logout,
          user,
          activeProfile,
          setActiveProfile,
          profiles,
          isOnboarded,
          completeOnboarding,
        }}
      >
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              
              {/* Onboarding routes */}
              <Route
                path="/onboarding"
                element={
                  <ProtectedRoute>
                    <OnboardingLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="step-1" element={<StepOne />} />
                <Route path="step-2" element={<StepTwo />} />
                <Route path="step-3" element={<StepThree />} />
                <Route path="step-4" element={<StepFour />} />
              </Route>

              {/* Protected routes (require authentication and completed onboarding) */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <OnboardingCheck>
                      <Dashboard />
                    </OnboardingCheck>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <OnboardingCheck>
                      <Products />
                    </OnboardingCheck>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/innovation"
                element={
                  <ProtectedRoute>
                    <OnboardingCheck>
                      <Innovation />
                    </OnboardingCheck>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <OnboardingCheck>
                      <Analytics />
                    </OnboardingCheck>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <OnboardingCheck>
                      <Settings />
                    </OnboardingCheck>
                  </ProtectedRoute>
                }
              />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
