import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product, productService } from "@/services/productService";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { cartService } from "@/services/cartService";
import { toast } from "sonner";

const ProductDetail = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      try {
        const fetchedProduct = await productService.getProductById(id);
        
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          navigate("/not-found");
        }
      } catch (error) {
        console.error("Error loading product:", error);
        toast.error("Impossible de charger les détails du produit");
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!product) return;
    
    cartService.addToCart(product);
    toast.success(`${product.name} ajouté au panier`);
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-500">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-500">Produit non trouvé</p>
          <Button className="mt-4" onClick={() => navigate("/products")}>
            Retour aux produits
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative overflow-hidden rounded-lg bg-gray-100 h-96 md:h-[600px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">{product.name}</h1>
          <p className="text-2xl font-semibold text-boutique-burgundy mb-6">{product.price} €</p>
          
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-2">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-2">Catégorie</h2>
            <p className="text-gray-600">{product.category}</p>
          </div>
          
          <div className="mt-auto">
            <Button 
              className="w-full bg-boutique-burgundy hover:bg-boutique-burgundy/90 text-white" 
              onClick={handleAddToCart}
              disabled={!product.available}
            >
              <ShoppingCart className="mr-2" />
              {product.available ? "Ajouter au panier" : "Indisponible"}
            </Button>
            
            {!product.available && (
              <p className="text-red-500 text-sm mt-2 text-center">
                Ce produit n'est plus disponible
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
