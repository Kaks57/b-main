import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { productService } from "../services/ProductService";


const ParfumeriePage = () => {
  const [parfums, setParfums] = useState<Product[]>([]);

  useEffect(() => {
    const fetchParfums = async () => {
      const allProducts = await productService.getProducts();
      const parfumsOnly = allProducts.filter((p) => p.category === "parfum");
      setParfums(parfumsOnly);
    };
    fetchParfums();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[50vh]">
          <img
            src="/parfum.jpeg"
            alt="Univers Parfumé"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-5xl font-bold mb-4">L'Art du Parfum</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xl mb-6">
            Découvrez une collection raffinée de parfums rares et envoûtants. Chaque essence est une invitation au voyage.
          </p>
        </div>
      </section>

      {/* Liste des parfums */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {parfums.map((parfum) => (
            <div key={parfum.id} className="bg-white rounded-2xl shadow p-4">
              <img
                src={parfum.image}
                alt={parfum.name}
                className="w-full h-64 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold">{parfum.name}</h3>
              <p className="text-sm text-gray-500">{parfum.description}</p>
              <p className="mt-2 font-bold text-boutique-burgundy">{parfum.price} €</p>
            </div>
          ))}
        </div>

        {parfums.length === 0 && (
          <p className="text-center mt-8 text-gray-500">Aucun parfum disponible pour le moment.</p>
        )}
      </section>
    </div>
  );
};

export default ParfumeriePage;
