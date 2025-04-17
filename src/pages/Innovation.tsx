
import PageContainer from '@/components/PageContainer';
import ChatInterface from '@/components/innovation/ChatInterface';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Lightbulb,
  BarChart2,
  Zap,
  RefreshCw,
  MousePointerClick,
  MessageSquarePlus,
  Plus,
} from 'lucide-react';

const Innovation = () => {
  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Innovation Lab</h1>
            <p className="text-muted-foreground">
              Generate insights and ideas using AI assistance
            </p>
          </div>
          
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Conversation
          </Button>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <Card className="h-[calc(100vh-13rem)] flex flex-col">
              <CardHeader className="border-b pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                      <Lightbulb className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Innovation Assistant</CardTitle>
                      <CardDescription>Powered by AI</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" title="Refresh conversation">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <div className="flex-1 overflow-hidden">
                <ChatInterface />
              </div>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Suggestion Prompts</CardTitle>
                <CardDescription>Try asking about these topics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-sm h-auto py-2 px-3 font-normal"
                >
                  <MessageSquarePlus className="h-3.5 w-3.5 mr-2" />
                  Analyze market trends for my product
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-sm h-auto py-2 px-3 font-normal"
                >
                  <MessageSquarePlus className="h-3.5 w-3.5 mr-2" />
                  Generate feature ideas based on customer feedback
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-sm h-auto py-2 px-3 font-normal"
                >
                  <MessageSquarePlus className="h-3.5 w-3.5 mr-2" />
                  Compare my product with competitor offerings
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Innovations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center">
                    <BarChart2 className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Market Analysis</h3>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-md bg-purple-100 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Feature Brainstorm</h3>
                    <p className="text-xs text-muted-foreground">1 week ago</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-md bg-green-100 flex items-center justify-center">
                    <MousePointerClick className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">UX Improvements</h3>
                    <p className="text-xs text-muted-foreground">2 weeks ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Innovation;
