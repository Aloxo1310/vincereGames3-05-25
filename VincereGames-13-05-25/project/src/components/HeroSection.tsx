import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

export default function HeroSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Parallax Background Images */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 w-full h-[200%] animate-parallax-slow">
          <img
            src="https://vinceregames-441081885.imgix.net/HeroSection02.png"
            alt="Fondo medieval"
            className="w-full h-1/2 object-cover"
          />

          <img
            src="https://vinceregames-441081885.imgix.net/HeroSection02.png"
            alt="Fondo medieval repetido"
            className="w-full h-1/2 object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 flex flex-col md:flex-row items-center z-10">
        <div className="md:w-1/2 mb-12 md:mb-0 md:pr-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-cream-50 leading-tight">
              <span>Experimenta la Gloria de</span>
              <span className="block text-gold-400 mt-2">Vincere Colors</span>
            </h1>
            <p className="mt-6 text-lg font-body text-cream-100 max-w-lg">
              Construye tu civilización, expande tu imperio y conquista a tus enemigos en esta aventura estratégica ambientada en la antigua Roma.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/game">
                <Button size="lg" variant="primary">
                  Saber Más
                </Button>
              </Link>
              <Link to="/store">
                <Button size="lg" variant="outline">
                  Visitar Tienda
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        <div className="md:w-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}  
            className="relative"
          >
            <div className="p-2 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg shadow-xl">
              <img
                src="https://vinceregames-441081885.imgix.net/HeroSection01.png"
                alt="Juego Vincere Colors"
                className="w-full h-auto rounded-md shadow-inner"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 md:w-32 md:h-32 bg-cream-50 rounded-full border-4 border-gold-400 flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform duration-300">
              <div className="text-center">
                <div className="text-black font-display font-bold text-xl md:text-2xl">NUEVO</div>
                <div className="text-gold-600 text-sm md:text-base">Lanzamiento</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-400 via-gold-600 to-gold-400" />
    </div>
  );
}