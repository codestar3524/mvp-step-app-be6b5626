
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product } from '@/lib/types';
import {
  X,
  Edit,
  BarChart3,
  Lightbulb,
  Users,
  ClipboardList,
  Calendar,
  Check,
  Link,
  ExternalLink,
  Clock,
} from 'lucide-react';

type ProductDetailProps = {
  product: Product | null;
  onClose: () => void;
};

const ProductDetail = ({ product, onClose }: ProductDetailProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="rounded-full bg-muted p-3 mb-4">
          <ClipboardList className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="font-medium mb-1">No Product Selected</h3>
        <p className="text-sm text-muted-foreground">
          Select a product from the table to view details
        </p>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-medium">Product Details</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-4 pb-0">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center text-muted-foreground text-sm mb-4">
            <span className="capitalize">{product.category}</span>
            <span className="mx-2">•</span>
            <span className="capitalize">{product.status}</span>
            <span className="mx-2">•</span>
            <span>Last updated: {product.lastUpdated}</span>
          </div>
          
          <div className="flex space-x-2 mb-6">
            <Button size="sm">
              <Edit className="mr-1 h-3 w-3" />
              Edit
            </Button>
            <Button size="sm" variant="outline">
              <ExternalLink className="mr-1 h-3 w-3" />
              View
            </Button>
          </div>
        </div>
        
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="border-b">
            <div className="px-4">
              <TabsList className="h-10 grid grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
                <TabsTrigger value="related">Related</TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          <div className="p-4">
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Product Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <span className="font-medium capitalize">{product.status}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Insights</span>
                      <span className="font-medium">{product.insights}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Category</span>
                      <span className="font-medium">{product.category}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Last Updated</span>
                      <span className="font-medium">{product.lastUpdated}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {product.name} is a {product.category.toLowerCase()} product that provides 
                    valuable insights and analytics to help businesses make data-driven decisions.
                    It's currently {product.status} and receiving regular updates.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mr-3 mt-0.5">
                        <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Product Updated</h4>
                        <p className="text-xs text-muted-foreground">{product.lastUpdated}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 mt-0.5">
                        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">First Release</h4>
                        <p className="text-xs text-muted-foreground">2024-11-15</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="insights" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Recent Insights</CardTitle>
                  <CardDescription>Insights generated from product data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center">
                        <Lightbulb className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">User Engagement Trend</h4>
                      <p className="text-xs text-muted-foreground">
                        User engagement has increased by 15% over the last month, primarily driven by the new features.
                      </p>
                      <div className="text-xs text-primary mt-1 font-medium">Feb 12, 2025</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <div className="h-8 w-8 rounded-md bg-purple-100 flex items-center justify-center">
                        <BarChart3 className="h-4 w-4 text-purple-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Performance Metrics</h4>
                      <p className="text-xs text-muted-foreground">
                        Load times have improved by 23% following the recent infrastructure upgrades.
                      </p>
                      <div className="text-xs text-primary mt-1 font-medium">Feb 5, 2025</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <div className="h-8 w-8 rounded-md bg-green-100 flex items-center justify-center">
                        <Users className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">User Feedback Analysis</h4>
                      <p className="text-xs text-muted-foreground">
                        Customer satisfaction ratings show a positive trend, with a 4.5/5 average score.
                      </p>
                      <div className="text-xs text-primary mt-1 font-medium">Jan 28, 2025</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full text-sm" size="sm">
                    View All Insights
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Generate New Insight</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Use AI to generate new insights based on your product data
                  </p>
                  <Button className="w-full mt-2" size="sm">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Generate Insight
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="related" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Related Products</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center mr-3">
                        <Link className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Mobile App</h4>
                        <p className="text-xs text-muted-foreground">Software</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center mr-3">
                        <Link className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Marketing Platform</h4>
                        <p className="text-xs text-muted-foreground">Software</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Scheduled Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center mr-3 mt-1">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Feature Review</h4>
                      <p className="text-xs text-muted-foreground">
                        Team meeting to review latest features and feedback
                      </p>
                      <div className="text-xs text-primary mt-1 font-medium">
                        Mar 5, 2025 • 10:00 AM
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;
