
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Database,
  LineChart,
  Users,
  ShoppingCart,
  Link2,
  Check,
  ExternalLink,
} from 'lucide-react';
import { DataSource } from '@/lib/types';
import { cn } from '@/lib/utils';

const StepThree = () => {
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: '1',
      name: 'Google Analytics',
      connected: false,
      type: 'analytics',
    },
    {
      id: '2',
      name: 'Salesforce',
      connected: false,
      type: 'crm',
    },
    {
      id: '3',
      name: 'Shopify',
      connected: false,
      type: 'sales',
    },
    {
      id: '4',
      name: 'Custom API',
      connected: false,
      type: 'custom',
    },
  ]);
  
  const [customApiName, setCustomApiName] = useState('');
  const [customApiUrl, setCustomApiUrl] = useState('');
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  
  const toggleDataSourceConnection = (id: string) => {
    setDataSources(
      dataSources.map((source) =>
        source.id === id ? { ...source, connected: !source.connected } : source
      )
    );
  };
  
  const handleAddCustomSource = () => {
    if (!customApiName || !customApiUrl) return;
    
    const newDataSource: DataSource = {
      id: Math.random().toString(36).substring(7),
      name: customApiName,
      connected: true,
      type: 'custom',
    };
    
    setDataSources([...dataSources, newDataSource]);
    setCustomApiName('');
    setCustomApiUrl('');
    setIsAddingCustom(false);
  };
  
  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'analytics':
        return LineChart;
      case 'crm':
        return Users;
      case 'sales':
        return ShoppingCart;
      case 'custom':
        return Link2;
      default:
        return Database;
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Connect Data Sources</h2>
        <p className="text-muted-foreground">
          Connect your data sources to start gathering insights.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {dataSources.map((source) => {
          const SourceIcon = getSourceIcon(source.type);
          return (
            <Card key={source.id} className={cn(
              "border-2 transition-all",
              source.connected ? "border-primary/50" : "border-transparent"
            )}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className={cn(
                      "mr-3 h-10 w-10 rounded-md flex items-center justify-center",
                      source.connected ? "bg-primary text-primary-foreground" : "bg-muted"
                    )}>
                      <SourceIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{source.name}</CardTitle>
                      <CardDescription className="capitalize">
                        {source.type} Integration
                      </CardDescription>
                    </div>
                  </div>
                  <Switch
                    checked={source.connected}
                    onCheckedChange={() => toggleDataSourceConnection(source.id)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {source.connected
                    ? "Connected and ready to sync data"
                    : "Connect to import data from this source"}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  asChild
                >
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Learn More
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
        
        {isAddingCustom ? (
          <Card>
            <CardHeader>
              <CardTitle>Add Custom API</CardTitle>
              <CardDescription>
                Connect to your own API endpoint
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-name">Name</Label>
                <Input
                  id="api-name"
                  placeholder="API Name"
                  value={customApiName}
                  onChange={(e) => setCustomApiName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-url">URL Endpoint</Label>
                <Input
                  id="api-url"
                  placeholder="https://api.example.com"
                  value={customApiUrl}
                  onChange={(e) => setCustomApiUrl(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setIsAddingCustom(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCustomSource}>
                Add API
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="border-2 border-dashed flex flex-col items-center justify-center p-6 h-full">
            <div className="rounded-full bg-muted h-10 w-10 flex items-center justify-center mb-2">
              <Plus className="h-5 w-5" />
            </div>
            <CardTitle className="text-lg mb-2">Custom Data Source</CardTitle>
            <CardDescription className="text-center mb-6">
              Connect to a custom API or data source
            </CardDescription>
            <Button variant="outline" onClick={() => setIsAddingCustom(true)}>
              Add Custom Source
            </Button>
          </Card>
        )}
      </div>
      
      <div className="bg-muted/50 rounded-md p-4 flex">
        <div className="rounded-full bg-primary/10 h-8 w-8 flex items-center justify-center mr-3 flex-shrink-0">
          <Check className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h4 className="text-sm font-medium">You can also add data sources later</h4>
          <p className="text-xs text-muted-foreground">
            Don't worry if you're not ready to connect all your data sources right now. You can always add more from the settings panel.
          </p>
        </div>
      </div>
    </div>
  );
};

const Plus = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

export default StepThree;
