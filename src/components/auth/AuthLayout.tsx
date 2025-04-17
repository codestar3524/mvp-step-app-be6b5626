
import { ReactNode } from 'react';

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle: string;
};

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div 
        className="hidden md:flex md:w-1/2 bg-primary items-center justify-center p-10"
        style={{
          backgroundImage: `linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)`,
        }}
      >
        <div className="text-white max-w-lg">
          <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            InsightPilot Nexus
          </div>
          <p className="text-lg md:text-xl opacity-80">
            Transform your product insights into actionable strategies with our AI-powered analytics platform
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-xl font-bold mb-1">200+</div>
              <div className="text-sm opacity-80">Data Sources</div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-xl font-bold mb-1">5,000+</div>
              <div className="text-sm opacity-80">Insights Generated</div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-xl font-bold mb-1">45%</div>
              <div className="text-sm opacity-80">Faster Decisions</div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-xl font-bold mb-1">150+</div>
              <div className="text-sm opacity-80">Enterprise Clients</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <div className="h-12 w-12 rounded-md bg-primary flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">IP</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-muted-foreground mt-2">{subtitle}</p>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
