import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { ShoppingCart, Package, Coins, Crown, Info } from 'lucide-react';

export default function StorePage() {
  useEffect(() => {
    document.title = 'Vincere Colors - Tienda';
  }, []);

  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Todos los Artículos' },
    { id: 'chests', name: 'Cofres' },
    { id: 'currency', name: 'Monedas' },
    { id: 'specials', name: 'Ofertas Especiales' },
  ];

  const storeItems = [
    {
      id: 1,
      name: 'Cofre de Bronce',
      description: 'Contiene objetos comunes y una pequeña cantidad de Donarium.',
      price: 4.99,
      image: 'https://vinceregames-441081885.imgix.net/CogreBrnoce.jpg',
      type: 'chests',
      highlight: false,
    },
    {
      id: 2,
      name: 'Cofre de Plata',
      description: 'Contiene objetos poco comunes y una cantidad moderada de Donarium.',
      price: 9.99,
      image: 'https://vinceregames-441081885.imgix.net/CofrePlata.jpg',
      type: 'chests',
      highlight: false,
    },
    {
      id: 3,
      name: 'Cofre de Oro',
      description: 'Contiene objetos raros y una gran cantidad de Donarium.',
      price: 19.99,
      image: 'https://vinceregames-441081885.imgix.net/CofreOro.jpg',
      type: 'chests',
      highlight: true,
    },
    {
      id: 4,
      name: '100 Donarium',
      description: 'Un pequeño paquete de monedas de Donarium para compras básicas.',
      price: 4.99,
      image: 'https://vinceregames-441081885.imgix.net/100Moneda.png',
      type: 'currency',
      highlight: false,
    },
    {
      id: 5,
      name: '500 Donarium',
      description: 'Un paquete mediano de monedas de Donarium para jugadores regulares.',
      price: 19.99,
      image: 'https://vinceregames-441081885.imgix.net/500Monedas.jpg',
      type: 'currency',
      highlight: false,
    },
    {
      id: 6,
      name: '1200 Donarium',
      description: 'Un gran paquete de monedas de Donarium con cantidad adicional de bonificación.',
      price: 39.99,
      image: 'https://vinceregames-441081885.imgix.net/1200Moneda.png',
      type: 'currency',
      highlight: true,
    },
    {
      id: 7,
      name: 'Paquete de Inicio',
      description: 'Perfecto para nuevos jugadores. Incluye un Cofre de Bronce y 200 Donarium.',
      price: 9.99,
      image: 'https://vinceregames-441081885.imgix.net/Cofre200.png',
      type: 'specials',
      highlight: true,
    },
    {
      id: 8,
      name: 'Paquete Premium',
      description: 'Oferta exclusiva con Cofre de Oro y 800 Donarium a precio rebajado.',
      price: 29.99,
      image: 'https://vinceregames-441081885.imgix.net/Cofre800.png',
      type: 'specials',
      highlight: true,
    },
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? storeItems
      : storeItems.filter((item) => item.type === selectedCategory);

  const handlePurchaseClick = (itemName: string) => {
    alert(`Las compras no están disponibles por ahora. Artículo: ${itemName}`);
  };

  return (
    <div className="bg-cream-50 min-h-screen pt-16">
      {/* Sección Hero */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-amber-900 to-amber-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <motion.img
            src="https://vinceregames-441081885.imgix.net/backgroundprofile"
            alt="Fondo de la tienda"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-amber-900 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-serif font-bold text-cream-50 mb-6"
          >
            Tienda de <span className="text-gold-400">Vincere</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-cream-100 max-w-3xl mx-auto mb-8"
          >
            Mejora tu experiencia de juego con cofres, monedas y ofertas especiales.
          </motion.p>

          {!user && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="max-w-md mx-auto bg-amber-800/80 rounded-lg p-4 mb-6 border border-amber-700"
            >
              <p className="text-cream-50 mb-2">
                <Info size={16} className="inline mr-2" />
                Crea una cuenta o inicia sesión para comprar artículos
              </p>
              <div className="flex justify-center space-x-4">
                <Link to="/login">
                  <Button
                    size="sm"
                    variant="primary"
                    className="bg-gold-400 hover:bg-gold-500 text-amber-900"
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    size="sm"
                    variant="primary"
                    className="bg-amber-800 text-cream-50 hover:bg-amber-700"
                  >
                    Registrarse
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contenido de la Tienda */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categorías */}
          <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide space-x-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-amber-800 text-cream-50'
                    : 'bg-cream-100 text-amber-900 hover:bg-amber-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Artículos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className={`bg-cream-100 rounded-lg overflow-hidden shadow-md border ${
                  item.highlight ? 'border-amber-500' : 'border-amber-200'
                } hover:shadow-lg hover:scale-105 transition-transform`}
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  {item.highlight && (
                    <div className="absolute top-2 right-2 bg-amber-500 text-cream-50 px-2 py-1 rounded-full text-xs font-medium">
                      Popular
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-serif font-bold text-amber-900 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-amber-800 text-sm mb-4 h-12 overflow-hidden">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-amber-900">
                      €{item.price.toFixed(2)}
                    </span>
                    <Button
                      size="sm"
                      variant="primary"
                      disabled={!user}
                      onClick={() => handlePurchaseClick(item.name)}
                    >
                      <ShoppingCart size={16} className="mr-1" /> Comprar
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}