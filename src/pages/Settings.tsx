
import { useState } from 'react';
import PageContainer from '@/components/PageContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAuth } from '@/App';
import { useToast } from '@/components/ui/use-toast';
import { updateUserSettings, updateOrganizationSettings } from '@/lib/api';
import { User, Settings2, Building2, Database } from 'lucide-react';

const Settings = () => {
  const { user, activeProfile, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('account');
  
  // User settings
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [weeklyReportsEnabled, setWeeklyReportsEnabled] = useState(true);
  
  // Organization settings
  const [orgName, setOrgName] = useState(activeProfile?.name || '');
  const [orgIndustry, setOrgIndustry] = useState('technology');
  const [description, setDescription] = useState('');
  
  // Data preferences settings
  const [dataRetentionPeriod, setDataRetentionPeriod] = useState('90');
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(true);
  const [dataSharingEnabled, setDataSharingEnabled] = useState(false);
  
  const handleSaveUserSettings = async () => {
    try {
      await updateUserSettings({
        name,
        email,
        preferences: {
          notifications: notificationsEnabled,
          weeklyReports: weeklyReportsEnabled,
        },
      });
      
      toast({
        title: 'Success',
        description: 'User settings saved successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save user settings',
        variant: 'destructive',
      });
    }
  };
  
  const handleSaveOrgSettings = async () => {
    try {
      await updateOrganizationSettings({
        name: orgName,
        industry: orgIndustry,
        description,
      });
      
      toast({
        title: 'Success',
        description: 'Organization settings saved successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save organization settings',
        variant: 'destructive',
      });
    }
  };
  
  const handleSaveDataPreferences = async () => {
    try {
      await updateOrganizationSettings({
        dataPreferences: {
          retentionPeriod: dataRetentionPeriod,
          autoBackup: autoBackupEnabled,
          dataSharing: dataSharingEnabled,
        },
      });
      
      toast({
        title: 'Success',
        description: 'Data preferences saved successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save data preferences',
        variant: 'destructive',
      });
    }
  };
  
  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="account" className="flex gap-2">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger value="organization" className="flex gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden md:inline">Organization</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="flex gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden md:inline">Data Preferences</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Settings</CardTitle>
                <CardDescription>
                  Manage your personal account settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleSaveUserSettings}>Save Changes</Button>
                </div>
                
                <div className="border-t pt-6 space-y-4">
                  <h3 className="text-lg font-medium">Notification Preferences</h3>
                  
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
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible actions for your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Log Out</h4>
                    <p className="text-sm text-muted-foreground">
                      Sign out of your account
                    </p>
                  </div>
                  <Button variant="outline" onClick={logout}>
                    Log Out
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Delete Account</h4>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Delete Account</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your
                          account and remove all your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive text-destructive-foreground"
                          onClick={() => {
                            toast({
                              title: 'Account Deletion',
                              description:
                                'This is a demo app. Your account would be deleted here.',
                            });
                          }}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="organization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Organization Settings</CardTitle>
                <CardDescription>
                  Manage your organization's profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="org-name">Organization Name</Label>
                    <Input
                      id="org-name"
                      placeholder="Organization name"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={orgIndustry} onValueChange={setOrgIndustry}>
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of your organization"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                    />
                  </div>
                  
                  <Button onClick={handleSaveOrgSettings}>Save Changes</Button>
                </div>
                
                <div className="border-t pt-6 space-y-4">
                  <h3 className="text-lg font-medium">Team Members</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your team members and their access rights
                  </p>
                  
                  <div className="flex justify-end">
                    <Button variant="outline">
                      Manage Team
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Billing & Subscription</CardTitle>
                <CardDescription>
                  Manage your subscription and payment details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium">Current Plan: Professional</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your subscription will renew on April 15, 2025
                  </p>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Update Payment Method</Button>
                  <Button>Manage Subscription</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Preferences</CardTitle>
                <CardDescription>
                  Manage how your data is stored and used
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="retention-period">Data Retention Period</Label>
                    <Select value={dataRetentionPeriod} onValueChange={setDataRetentionPeriod}>
                      <SelectTrigger id="retention-period">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                        <SelectItem value="forever">Forever</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Data older than this will be automatically archived
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-backup">Automatic Backups</Label>
                      <p className="text-sm text-muted-foreground">
                        Regularly backup your data
                      </p>
                    </div>
                    <Switch
                      id="auto-backup"
                      checked={autoBackupEnabled}
                      onCheckedChange={setAutoBackupEnabled}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-sharing">Data Sharing</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow anonymized data to be used for improving our services
                      </p>
                    </div>
                    <Switch
                      id="data-sharing"
                      checked={dataSharingEnabled}
                      onCheckedChange={setDataSharingEnabled}
                    />
                  </div>
                  
                  <Button onClick={handleSaveDataPreferences}>Save Preferences</Button>
                </div>
                
                <div className="border-t pt-6 space-y-4">
                  <h3 className="text-lg font-medium">Data Sources</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your connected data sources and integrations
                  </p>
                  
                  <div className="flex justify-end">
                    <Button variant="outline">
                      Manage Connections
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Export & Import</CardTitle>
                <CardDescription>
                  Export or import your data
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="flex-1">
                  Export All Data
                </Button>
                <Button variant="outline" className="flex-1">
                  Import Data
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Data Deletion</CardTitle>
                <CardDescription>
                  Permanently delete specific data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete All Data</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete all your 
                        organization's data, including products, insights, and analytics.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive text-destructive-foreground"
                        onClick={() => {
                          toast({
                            title: 'Data Deletion',
                            description:
                              'This is a demo app. Your data would be deleted here.',
                          });
                        }}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Settings;
