
import { Product, InsightMetric, ChartData, DataSource } from './types';

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Products API
export const fetchProducts = async (): Promise<Product[]> => {
  await delay(800);
  return [
    {
      id: '1',
      name: 'Analytics Dashboard',
      category: 'Software',
      status: 'active',
      insights: 24,
      lastUpdated: '2025-02-15',
    },
    {
      id: '2',
      name: 'Mobile App',
      category: 'Software',
      status: 'active',
      insights: 18,
      lastUpdated: '2025-02-10',
    },
    {
      id: '3',
      name: 'Cloud Storage',
      category: 'Service',
      status: 'pending',
      insights: 7,
      lastUpdated: '2025-02-05',
    },
    {
      id: '4',
      name: 'Marketing Platform',
      category: 'Software',
      status: 'active',
      insights: 32,
      lastUpdated: '2025-01-28',
    },
    {
      id: '5',
      name: 'Smart Speaker',
      category: 'Hardware',
      status: 'archived',
      insights: 15,
      lastUpdated: '2024-12-12',
    },
  ];
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  const products = await fetchProducts();
  return products.find(product => product.id === id) || null;
};

export const addNewProduct = async (product: Omit<Product, 'id' | 'insights' | 'lastUpdated'>): Promise<Product> => {
  await delay(1000);
  
  return {
    ...product,
    id: Math.random().toString(36).substr(2, 9),
    insights: 0,
    lastUpdated: new Date().toISOString().split('T')[0],
  };
};

// Insights API
export const fetchMetrics = async (): Promise<InsightMetric[]> => {
  await delay(1000);
  
  return [
    {
      title: 'Total Products',
      value: 15,
      change: 2,
      trend: 'up',
      description: 'Total number of products in your portfolio',
    },
    {
      title: 'Active Insights',
      value: 87,
      change: 12,
      trend: 'up',
      description: 'Current active insights across all products',
    },
    {
      title: 'Market Growth',
      value: '12.4%',
      change: -1.2,
      trend: 'down',
      description: 'Year-over-year market growth rate',
    },
    {
      title: 'Customer Satisfaction',
      value: 94,
      change: 3,
      trend: 'up',
      description: 'Average customer satisfaction score',
    },
  ];
};

export const fetchChartData = async (chartType: string): Promise<ChartData[]> => {
  await delay(1000);
  
  if (chartType === 'categoryDistribution') {
    return [
      { name: 'Software', value: 65 },
      { name: 'Hardware', value: 15 },
      { name: 'Service', value: 20 },
    ];
  }
  
  if (chartType === 'insightTrend') {
    return [
      { name: 'Jan', value: 42 },
      { name: 'Feb', value: 56 },
      { name: 'Mar', value: 48 },
      { name: 'Apr', value: 63 },
      { name: 'May', value: 78 },
    ];
  }
  
  if (chartType === 'productPerformance') {
    return [
      { name: 'Analytics Dashboard', value: 78 },
      { name: 'Mobile App', value: 65 },
      { name: 'Cloud Storage', value: 54 },
      { name: 'Marketing Platform', value: 82 },
      { name: 'Smart Speaker', value: 43 },
    ];
  }
  
  return [];
};

// Data Sources API
export const fetchDataSources = async (): Promise<DataSource[]> => {
  await delay(800);
  
  return [
    {
      id: '1',
      name: 'Google Analytics',
      connected: true,
      type: 'analytics',
    },
    {
      id: '2',
      name: 'Salesforce',
      connected: true,
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
      connected: true,
      type: 'custom',
    },
  ];
};

// Innovation API - LLM Chat
export const sendChatMessage = async (message: string): Promise<string> => {
  await delay(1500);
  
  const responses = [
    "Based on your product data, I suggest focusing on improving mobile app user retention. Recent insights show a 15% drop-off after the first week.",
    "Looking at your market analysis, there's an opportunity to expand into the healthcare vertical. Three of your competitors have recently launched products in this space.",
    "Your customer feedback indicates a strong desire for integration with major CRM platforms. This could be a quick win for your product roadmap.",
    "The latest market trends show increased demand for AI-powered analytics features. Your current offering could be enhanced with predictive analysis capabilities.",
    "Comparing your product performance against benchmarks, your onboarding flow shows higher friction than industry standards. Consider simplifying the first-time user experience.",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

// User Settings
export const updateUserSettings = async (settings: any): Promise<boolean> => {
  await delay(1000);
  console.log('Settings updated:', settings);
  return true;
};

// Organization Settings
export const updateOrganizationSettings = async (settings: any): Promise<boolean> => {
  await delay(1000);
  console.log('Organization settings updated:', settings);
  return true;
};
