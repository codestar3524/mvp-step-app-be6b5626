
import { useEffect, useState } from 'react';
import PageContainer from '@/components/PageContainer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import MetricCard from '@/components/analytics/MetricCard';
import AnalyticsChart from '@/components/analytics/AnalyticsChart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download, RefreshCcw, Filter } from 'lucide-react';
import { fetchMetrics, fetchChartData, fetchProducts } from '@/lib/api';
import { InsightMetric, ChartData, Product } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';

const Analytics = () => {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<InsightMetric[]>([]);
  const [categoryDistribution, setCategoryDistribution] = useState<ChartData[]>([]);
  const [insightTrend, setInsightTrend] = useState<ChartData[]>([]);
  const [productPerformance, setProductPerformance] = useState<ChartData[]>([]);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [timeRange, setTimeRange] = useState('month');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadAnalyticsData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all data concurrently
        const [metricsData, categoryData, trendData, performanceData, productsData] =
          await Promise.all([
            fetchMetrics(),
            fetchChartData('categoryDistribution'),
            fetchChartData('insightTrend'),
            fetchChartData('productPerformance'),
            fetchProducts(),
          ]);
        
        setMetrics(metricsData);
        setCategoryDistribution(categoryData);
        setInsightTrend(trendData);
        setProductPerformance(performanceData);
        
        // Sort products by insights and take top 5
        const sortedProducts = [...productsData].sort(
          (a, b) => b.insights - a.insights
        );
        setTopProducts(sortedProducts.slice(0, 5));
      } catch (error) {
        console.error('Failed to load analytics data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load analytics data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAnalyticsData();
  }, [toast]);
  
  const handleRefresh = async () => {
    toast({
      title: 'Refreshing data',
      description: 'Fetching the latest analytics data',
    });
    
    // Re-fetch all data
    try {
      setIsLoading(true);
      const [metricsData, categoryData, trendData, performanceData, productsData] =
        await Promise.all([
          fetchMetrics(),
          fetchChartData('categoryDistribution'),
          fetchChartData('insightTrend'),
          fetchChartData('productPerformance'),
          fetchProducts(),
        ]);
      
      setMetrics(metricsData);
      setCategoryDistribution(categoryData);
      setInsightTrend(trendData);
      setProductPerformance(performanceData);
      
      const sortedProducts = [...productsData].sort(
        (a, b) => b.insights - a.insights
      );
      setTopProducts(sortedProducts.slice(0, 5));
      
      toast({
        title: 'Data refreshed',
        description: 'Analytics data has been updated',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to refresh analytics data',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Analytics</h1>
            <p className="text-muted-foreground">
              View insights and metrics for your products
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
                <SelectItem value="quarter">Last quarter</SelectItem>
                <SelectItem value="year">Last year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array(4)
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
            : metrics.map((metric, i) => <MetricCard key={i} metric={metric} />)}
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <AnalyticsChart
            type="line"
            data={insightTrend}
            title="Insight Growth Trend"
            className={isLoading ? 'animate-pulse' : ''}
          />
          <AnalyticsChart
            type="pie"
            data={categoryDistribution}
            title="Product Category Distribution"
            className={isLoading ? 'animate-pulse' : ''}
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Product Performance</CardTitle>
              <CardDescription>
                Performance metrics across your top products
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <AnalyticsChart
                type="bar"
                data={productPerformance}
                title=""
                className="border-0"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Top Products</CardTitle>
                <CardDescription>By number of insights</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Filter className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="px-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Insights</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading
                    ? Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <TableRow key={i}>
                            <TableCell>
                              <div className="h-4 w-24 bg-muted rounded"></div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="h-4 w-8 bg-muted rounded ml-auto"></div>
                            </TableCell>
                          </TableRow>
                        ))
                    : topProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">
                            {product.name}
                          </TableCell>
                          <TableCell className="text-right">
                            {product.insights}
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default Analytics;
