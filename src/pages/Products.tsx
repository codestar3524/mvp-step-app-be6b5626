
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import PageContainer from '@/components/PageContainer';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import ProductTable from '@/components/products/ProductTable';
import ProductDetail from '@/components/products/ProductDetail';
import { Product } from '@/lib/types';
import { fetchProducts } from '@/lib/api';
import { Plus } from 'lucide-react';

const Products = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        toast({
          title: 'Error',
          description: 'Failed to load products',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, [toast]);
  
  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Products</h1>
            <p className="text-muted-foreground">
              Manage and track insights for your products
            </p>
          </div>
          
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
        
        <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-13rem)] border rounded-md">
          <ResizablePanel defaultSize={60} minSize={40}>
            <div className="p-4">
              <ProductTable
                products={products}
                isLoading={isLoading}
                onSelectProduct={setSelectedProduct}
                selectedProductId={selectedProduct?.id || null}
              />
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={40} minSize={30}>
            <ProductDetail 
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </PageContainer>
  );
};

export default Products;
