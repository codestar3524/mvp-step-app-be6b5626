
import { useEffect, useState } from 'react';
import { useAuth } from '@/App';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, LineChart } from 'recharts';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Lightbulb,
  BarChart3,
  Package,
  Clock,
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { InsightMetric, ChartData } from '@/lib/types';
import { fetchMetrics, fetchChartData } from '@/lib/api';

const MetricCard = ({ metric }: { metric: InsightMetric }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {metric.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{metric.value}</div>
          {metric.change !== undefined && (
            <div
              className={cn(
                "flex items-center text-xs font-medium",
                metric.trend === "up"
                  ? "text-green-500"
                  : metric.trend === "down"
                  ? "text-red-500"
                  : "text-muted-foreground"
              )}
            >
              {metric.trend === "up" ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {metric.change > 0 && "+"}
              {metric.change}%
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const { activeProfile } = useAuth();
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<InsightMetric[]>([]);
  const [categoryDistribution, setCategoryDistribution] = useState<ChartData[]>([]);
  const [insightTrend, setInsightTrend] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        // Fetch metrics and chart data
        const metricsData = await fetchMetrics();
        const categoryData = await fetchChartData('categoryDistribution');
        const trendData = await fetchChartData('insightTrend');
        
        setMetrics(metricsData);
        setCategoryDistribution(categoryData);
        setInsightTrend(trendData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load dashboard data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDashboardData();
  }, [toast]);
  
  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back to {activeProfile?.name || 'your dashboard'}
            </p>
          </div>
          
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button variant="outline">
              Export Reports
            </Button>
            <Button>
              New Insight
            </Button>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            Array(4)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="pb-2">
                    <div className="h-4 w-24 bg-muted rounded"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-8 w-16 bg-muted rounded mb-2"></div>
                    <div className="h-3 w-full bg-muted rounded"></div>
                  </CardContent>
                </Card>
              ))
          ) : (
            metrics.map((metric, i) => <MetricCard key={i} metric={metric} />)
          )}
        </div>
        
        {/* Recent Activity and Quick Actions */}
        <div className="grid gap-6 md:grid-cols-6">
          <Card className="md:col-span-4 overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Insights</span>
                <Button variant="link" className="text-sm p-0 h-auto">
                  View All <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border-t">
                {isLoading ? (
                  Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 border-b animate-pulse"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 bg-muted rounded-md"></div>
                          <div>
                            <div className="h-4 w-48 bg-muted rounded mb-2"></div>
                            <div className="h-3 w-24 bg-muted rounded"></div>
                          </div>
                        </div>
                        <div className="h-8 w-16 bg-muted rounded"></div>
                      </div>
                    ))
                ) : (
                  <div>
                    <div className="flex items-center p-4 border-b">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                          <Lightbulb className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Customer Satisfaction Improvement</h4>
                          <p className="text-sm text-muted-foreground">Mobile App</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">Today</div>
                    </div>
                    
                    <div className="flex items-center p-4 border-b">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="h-10 w-10 rounded-md bg-purple-100 flex items-center justify-center">
                          <BarChart3 className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Market Share Analysis</h4>
                          <p className="text-sm text-muted-foreground">Analytics Dashboard</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">Yesterday</div>
                    </div>
                    
                    <div className="flex items-center p-4 border-b">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="h-10 w-10 rounded-md bg-green-100 flex items-center justify-center">
                          <Package className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Product Launch Strategy</h4>
                          <p className="text-sm text-muted-foreground">Marketing Platform</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">2 days ago</div>
                    </div>
                    
                    <div className="flex items-center p-4 border-b">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="h-10 w-10 rounded-md bg-yellow-100 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Performance Optimization</h4>
                          <p className="text-sm text-muted-foreground">Cloud Storage</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">3 days ago</div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <Package className="mr-2 h-4 w-4" />
                Add New Product
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Lightbulb className="mr-2 h-4 w-4" />
                Create Innovation
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
