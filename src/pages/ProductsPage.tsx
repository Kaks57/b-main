import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { productService, Product } from "@/services/productService";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { User, Users, Baby } from "lucide-react";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productData = await productService.getProducts();
        // Exclure les produits de catégorie "parfum"
        const filteredOutParfums = productData.filter(
          (p) => p.category !== "parfum"
        );
        setProducts(filteredOutParfums);
        setFilteredProducts(filteredOutParfums);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    let result = products;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((product) => product.category === categoryFilter);
    }

    // Apply gender filter
    if (genderFilter !== "all") {
      result = result.filter((product) => product.gender === genderFilter);
    }

    setFilteredProducts(result);
  }, [searchTerm, categoryFilter, genderFilter, products]);

  // Extract unique categories from products
  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Notre Collection</h1>
      <p className="text-lg text-gray-600 mb-8">
        Explorez notre sélection de pièces uniques et trouvez l'article parfait
        qui vous correspond.
      </p>

      {/* Gender category buttons */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <Button
          variant={genderFilter === "all" ? "default" : "outline"}
          className={
            genderFilter === "all"
              ? "bg-boutique-burgundy hover:bg-boutique-burgundy/90"
              : ""
          }
          onClick={() => setGenderFilter("all")}
        >
          <Users className="mr-2 h-4 w-4" />
          Tous
        </Button>
        <Button
          variant={genderFilter === "homme" ? "default" : "outline"}
          className={
            genderFilter === "homme"
              ? "bg-boutique-burgundy hover:bg-boutique-burgundy/90"
              : ""
          }
          onClick={() => setGenderFilter("homme")}
        >
          <User className="mr-2 h-4 w-4" />
          Homme
        </Button>
        <Button
          variant={genderFilter === "femme" ? "default" : "outline"}
          className={
            genderFilter === "femme"
              ? "bg-boutique-burgundy hover:bg-boutique-burgundy/90"
              : ""
          }
          onClick={() => setGenderFilter("femme")}
        >
          <User className="mr-2 h-4 w-4" />
          Femme
        </Button>
        <Button
          variant={genderFilter === "enfant" ? "default" : "outline"}
          className={
            genderFilter === "enfant"
              ? "bg-boutique-burgundy hover:bg-boutique-burgundy/90"
              : ""
          }
          onClick={() => setGenderFilter("enfant")}
        >
          <Baby className="mr-2 h-4 w-4" />
          Enfant
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="w-full md:w-2/3">
          <Input
            type="search"
            placeholder="Rechercher par nom ou description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-1/3">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrer par catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "Toutes les catégories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">Chargement des produits...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            Aucun produit ne correspond à votre recherche. Essayez d'autres termes
            ou filtres.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="animate-slide-up">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
