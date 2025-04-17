
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { InsightMetric } from '@/lib/types';

interface MetricCardProps {
  metric: InsightMetric;
  className?: string;
}

const MetricCard = ({ metric, className }: MetricCardProps) => {
  const renderTrendIcon = () => {
    if (metric.trend === 'up') {
      return <TrendingUp className="h-3 w-3 mr-1" />;
    }
    if (metric.trend === 'down') {
      return <TrendingDown className="h-3 w-3 mr-1" />;
    }
    return <Minus className="h-3 w-3 mr-1" />;
  };
  
  const getTrendColor = () => {
    if (metric.trend === 'up') {
      return 'text-green-500';
    }
    if (metric.trend === 'down') {
      return 'text-red-500';
    }
    return 'text-muted-foreground';
  };
  
  return (
    <Card className={className}>
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
                getTrendColor()
              )}
            >
              {renderTrendIcon()}
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

export default MetricCard;
