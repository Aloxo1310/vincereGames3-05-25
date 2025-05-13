import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { ShieldIcon, SwordIcon, Compass, Castle, Award } from 'lucide-react';

export default function HomePage() {
  useEffect(() => {
    document.title = 'Vincere Games - Inicio';
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-cream-50 min-h-screen">
      <HeroSection />
      
      {/* Sección de Características */}
      <section className="py-16 md:py-24 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-serif font-bold text-amber-900">
              Descubre Vincere Colors
            </motion.h2>
            <motion.p variants={fadeIn} className="mt-4 text-lg text-amber-800 max-w-2xl mx-auto">
              Construye tu imperio, entrena tus ejércitos y alcanza la gloria en esta aventura estratégica.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-cream-50 rounded-lg p-8 shadow-md border border-amber-200"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 mb-4">
                <Castle size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">Construir y Expandir</h3>
              <p className="text-amber-800">
                Construye granjas, minas y edificios para hacer crecer tu civilización y establecer tu presencia.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-cream-50 rounded-lg p-8 shadow-md border border-amber-200"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 mb-4">
                <SwordIcon size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">Entrena y Conquista</h3>
              <p className="text-amber-800">
                Recluta soldados, arqueros y unidades especializadas para defender tus tierras y conquistar a tus enemigos.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-cream-50 rounded-lg p-8 shadow-md border border-amber-200"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 mb-4">
                <Compass size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">Explora y Descubre</h3>
              <p className="text-amber-800">
                Aventúrate en lo desconocido, descubre valiosos recursos y desentraña secretos antiguos.
              </p>
            </motion.div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/game">
              <Button variant="primary" size="lg">
                Explorar el Juego
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Sección de Galería */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900">
              Galería
            </h2>
            <p className="mt-4 text-lg text-amber-800 max-w-2xl mx-auto">
              Experimenta los impresionantes visuales de Vincere Colors.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "https://images.pexels.com/photos/2832034/pexels-photo-2832034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              "https://images.pexels.com/photos/2832077/pexels-photo-2832077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              "https://images.pexels.com/photos/2832039/pexels-photo-2832039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              "https://images.pexels.com/photos/2835562/pexels-photo-2835562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              "https://images.pexels.com/photos/931018/pexels-photo-931018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              "https://images.pexels.com/photos/45842/clasical-music-musical-notes-sheet-music-45842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="overflow-hidden rounded-lg shadow-md border border-amber-200"
              >
                <div className="relative group">
                  <img
                    src={image}
                    alt={`Captura de pantalla ${index + 1}`}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4">
                      <h3 className="text-cream-50 font-serif font-bold">Vincere Colors</h3>
                      <p className="text-cream-100 text-sm">Captura del juego</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Llamado a la Acción */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-amber-900 to-amber-800 text-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              ¿Listo para comenzar tu aventura?
            </h2>
            <p className="mt-4 text-lg text-cream-100 max-w-2xl mx-auto">
              Únete a miles de jugadores en el mundo de Vincere Colors hoy mismo.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/store">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-gold-400 hover:bg-gold-500 text-amber-900"
                >
                  Visitar Tienda
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-cream-50 text-cream-50 hover:bg-amber-800"
                >
                  Crear Cuenta
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}