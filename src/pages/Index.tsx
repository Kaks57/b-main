
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { productService } from "@/services/productService";
import { Product } from "@/services/productService";

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await productService.getProducts();
        setFeaturedProducts(products.slice(0, 3));
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, []);
  
  return (
    <div className="animate-fade-in">
     {/* Hero Section */}
<section className="relative">
  <div className="relative h-[80vh]">
    {/* Image de fond */}
    <img
      src="/PLAN.jpeg"
      alt="Atelier Unique"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/40"></div>
    <div className="relative h-full flex items-center justify-center">
      <div className="text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Boutique en ligne</h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8">
          Découvrez notre Boutique en ligne accessoires - vêtements - parfumerie
        </p>
        <Link to="/products">
          <Button className="bg-boutique-burgundy hover:bg-boutique-burgundy/90 text-white px-8 py-6 text-lg">
            Explorer la collection
          </Button>
        </Link>
      </div>
    </div>
  </div>
</section>

      
      {/* Featured Products */}
      <section className="py-16 bg-boutique-cream/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Pièces Sélectionnées</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chaque article est soigneusement sélectionné pour sa qualité et son caractère unique.
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">Chargement des produits...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <div key={product.id} className="animate-slide-up">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link to="/products">
              <Button variant="outline" className="group text-boutique-burgundy border-boutique-burgundy hover:bg-boutique-burgundy hover:text-white">
                Voir toute la collection
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
