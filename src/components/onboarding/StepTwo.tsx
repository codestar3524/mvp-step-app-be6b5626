
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Plus,
  Package,
  Trash2,
  CheckCircle2,
  Clock,
  Archive,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/types';
import { cn } from '@/lib/utils';

const StepTwo = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Analytics Dashboard',
      category: 'Software',
      status: 'active',
      insights: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
    },
  ]);
  
  const [isAdding, setIsAdding] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
  
  const handleAddProduct = () => {
    if (!newProductName || !newProductCategory) return;
    
    const newProduct: Product = {
      id: Math.random().toString(36).substring(7),
      name: newProductName,
      category: newProductCategory,
      status: 'active',
      insights: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    
    setProducts([...products, newProduct]);
    setIsAdding(false);
    setNewProductName('');
    setNewProductCategory('');
    setNewProductDescription('');
  };
  
  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };
  
  const statusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'archived':
        return <Archive className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };
  
  const statusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'archived':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      default:
        return '';
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Your Products</h2>
        <p className="text-muted-foreground">
          Add the products you want to track insights for.
        </p>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={cn("flex w-fit items-center gap-1", statusColor(product.status))}
                  >
                    {statusIcon(product.status)}
                    <span className="capitalize">{product.status}</span>
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {isAdding ? (
        <div className="space-y-4 border rounded-md p-4 bg-card">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Add New Product</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input
                  id="product-name"
                  placeholder="Enter product name"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="product-category">Category</Label>
                <Select value={newProductCategory} onValueChange={setNewProductCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Software">Software</SelectItem>
                    <SelectItem value="Hardware">Hardware</SelectItem>
                    <SelectItem value="Service">Service</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="product-description">Description (optional)</Label>
              <Textarea
                id="product-description"
                placeholder="Brief description of your product"
                value={newProductDescription}
                onChange={(e) => setNewProductDescription(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleAddProduct}>
                Save Product
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Button onClick={() => setIsAdding(true)} className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      )}
      
      {products.length === 0 && !isAdding && (
        <div className="flex flex-col items-center justify-center p-8 text-center border rounded-md border-dashed">
          <Package className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="font-medium">No products added yet</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add your first product to start tracking insights.
          </p>
          <Button onClick={() => setIsAdding(true)} variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Product
          </Button>
        </div>
      )}
    </div>
  );
};

export default StepTwo;
