
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  CheckCircle2,
  Clock,
  Archive,
  ChevronDown,
  Search,
  Filter,
} from 'lucide-react';

type ProductTableProps = {
  products: Product[];
  isLoading: boolean;
  onSelectProduct: (product: Product) => void;
  selectedProductId: string | null;
};

const ProductTable = ({
  products,
  isLoading,
  onSelectProduct,
  selectedProductId,
}: ProductTableProps) => {
  const [search, setSearch] = useState('');
  
  const filteredProducts = products.filter(
    (product) => product.name.toLowerCase().includes(search.toLowerCase())
  );
  
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
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex gap-1">
          <Filter className="h-4 w-4" />
          Filter
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Insights</TableHead>
              <TableHead className="text-right">Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i} className="animate-pulse">
                    <TableCell>
                      <div className="h-5 w-40 bg-muted rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-5 w-20 bg-muted rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-5 w-16 bg-muted rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-5 w-8 bg-muted rounded" />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="h-5 w-20 bg-muted rounded ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
            ) : filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No products found
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow 
                  key={product.id} 
                  className={cn(
                    "cursor-pointer hover:bg-muted/50", 
                    selectedProductId === product.id && "bg-muted/50"
                  )}
                  onClick={() => onSelectProduct(product)}
                >
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
                  <TableCell>{product.insights}</TableCell>
                  <TableCell className="text-right">{product.lastUpdated}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductTable;
