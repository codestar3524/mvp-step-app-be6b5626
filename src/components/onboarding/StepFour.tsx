
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Bell,
  Zap,
  PieChart,
  LineChart,
  Users,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';

const StepFour = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [weeklyReportsEnabled, setWeeklyReportsEnabled] = useState(true);
  const [automatedInsightsEnabled, setAutomatedInsightsEnabled] = useState(true);
  const [insightPriority, setInsightPriority] = useState('balanced');
  const [analyticsView, setAnalyticsView] = useState('detailed');
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Preferences</h2>
        <p className="text-muted-foreground">
          Customize your experience with InsightPilot.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center mb-2">
              <div className="bg-primary/10 h-8 w-8 rounded-md flex items-center justify-center mr-3">
                <Bell className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-lg">Notifications</CardTitle>
            </div>
            <CardDescription>
              Configure how and when you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive important alerts via email
                </p>
              </div>
              <Switch
                id="notifications"
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weekly-reports">Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">
                  Get a weekly summary of your insights
                </p>
              </div>
              <Switch
                id="weekly-reports"
                checked={weeklyReportsEnabled}
                onCheckedChange={setWeeklyReportsEnabled}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center mb-2">
              <div className="bg-primary/10 h-8 w-8 rounded-md flex items-center justify-center mr-3">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-lg">Automation</CardTitle>
            </div>
            <CardDescription>
              Control automated features and AI insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="automated-insights">Automated Insights</Label>
                <p className="text-sm text-muted-foreground">
                  AI-generated insights based on your data
                </p>
              </div>
              <Switch
                id="automated-insights"
                checked={automatedInsightsEnabled}
                onCheckedChange={setAutomatedInsightsEnabled}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Insight Priority</Label>
              <RadioGroup 
                value={insightPriority} 
                onValueChange={setInsightPriority}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="priority-speed" value="speed" />
                  <Label 
                    htmlFor="priority-speed" 
                    className="text-sm cursor-pointer"
                  >
                    Speed over accuracy
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="priority-balanced" value="balanced" />
                  <Label 
                    htmlFor="priority-balanced" 
                    className="text-sm cursor-pointer"
                  >
                    Balanced approach
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="priority-accuracy" value="accuracy" />
                  <Label 
                    htmlFor="priority-accuracy" 
                    className="text-sm cursor-pointer"
                  >
                    Accuracy over speed
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center mb-2">
              <div className="bg-primary/10 h-8 w-8 rounded-md flex items-center justify-center mr-3">
                <PieChart className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-lg">Analytics Preferences</CardTitle>
            </div>
            <CardDescription>
              Choose how analytics data is presented
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Default Analytics View</Label>
              <RadioGroup 
                value={analyticsView} 
                onValueChange={setAnalyticsView}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="view-summary" value="summary" />
                  <Label htmlFor="view-summary" className="text-sm cursor-pointer">
                    Summary view
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="view-detailed" value="detailed" />
                  <Label htmlFor="view-detailed" className="text-sm cursor-pointer">
                    Detailed view
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 text-primary">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <Label className="text-sm">Data comparison enabled by default</Label>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-none">
          <CardHeader className="pb-3">
            <div className="flex items-center mb-2">
              <div className="bg-primary/20 h-8 w-8 rounded-md flex items-center justify-center mr-3">
                <Lightbulb className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-lg">Ready to Get Started</CardTitle>
            </div>
            <CardDescription>
              You've completed all the setup steps
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              You can now explore the platform and start discovering insights. All these preferences can be changed later in your account settings.
            </p>
            
            <div className="bg-secondary/10 p-3 rounded-md flex items-start">
              <Users className="h-5 w-5 text-secondary mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-xs">
                <span className="font-medium">Pro tip:</span> Invite team members from your dashboard to collaborate on insights and share discoveries.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex items-center justify-center p-4">
        <div className="flex items-center space-x-1 text-muted-foreground text-sm">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <span>Almost done! Click "Complete Setup" to finish.</span>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
