
export type Profile = {
  id: string;
  name: string;
  logo: string;
  industry: string;
  productsCount: number;
  insights: number;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  status: 'active' | 'pending' | 'archived';
  insights: number;
  lastUpdated: string;
};

export type InsightMetric = {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  description: string;
};

export type ChartData = {
  name: string;
  value: number;
};

export type DataSource = {
  id: string;
  name: string;
  connected: boolean;
  type: 'analytics' | 'crm' | 'sales' | 'custom';
};
