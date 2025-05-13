import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Users, Building2, Trees, Mountain, Sword, ShieldAlert, Award, ArrowRight } from 'lucide-react';

export default function GamePage() {
  useEffect(() => {
    document.title = 'Vincere Colors - Información del Juego';
  }, []);

  return (
    <div className="bg-cream-50 min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-amber-900 to-amber-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <motion.img
            src="https://images.pexels.com/photos/175771/pexels-photo-175771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Fondo romano"
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
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-cream-50 mb-6"
          >
            Vincere <span className="text-gold-400">Colors</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-cream-100 max-w-3xl mx-auto mb-8"
          >
            Construye tu imperio, entrena tus ejércitos y conquista a tus enemigos en esta aventura estratégica ambientada en la antigua Roma.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/store">
              <Button
                variant="primary"
                size="lg"
                className="bg-gold-400 hover:bg-gold-500 text-amber-900"
              >
                Comenzar Ahora
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Características del Juego */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-serif font-bold text-amber-900"
            >
              Características del Juego
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-lg text-amber-800 max-w-2xl mx-auto"
            >
              Explora el rico mundo de Vincere Colors con elementos únicos de juego
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users size={24} />,
                title: "Clases de la Población",
                description: "Gestiona diferentes clases de ciudadanos, desde agricultores hasta soldados, cada uno con habilidades únicas."
              },
              {
                icon: <Building2 size={24} />,
                title: "Edificios Estratégicos",
                description: "Construye edificios para expandir tu ciudad, fortalecer defensas y optimizar la recolección de recursos."
              },
              {
                icon: <Sword size={24} />,
                title: "Unidades Militares",
                description: "Entrena soldados, arqueros y unidades especializadas para defender tu territorio y conquistar a tus enemigos."
              },
              {
                icon: <Mountain size={24} />,
                title: "Gestión de Recursos",
                description: "Recolecta y gestiona recursos como hierro, madera y materiales naturales para impulsar el crecimiento de tu imperio."
              },
              {
                icon: <ShieldAlert size={24} />,
                title: "Desarrollo de Civilización",
                description: "Avanza tu civilización a través de desarrollos tecnológicos y culturales para obtener ventajas estratégicas."
              },
              {
                icon: <Award size={24} />,
                title: "Condiciones de Victoria",
                description: "Alcanza la victoria mediante la conquista militar, la dominancia económica o la superioridad cultural."
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-cream-100 rounded-lg p-6 shadow-md border border-amber-200 hover:shadow-lg hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">{feature.title}</h3>
                <p className="text-amber-800">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Llamado a la acción */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900">
              ¿Listo para Comenzar tu Aventura?
            </h2>
            <p className="mt-4 text-lg text-amber-800 max-w-2xl mx-auto">
              Crea tu cuenta hoy y empieza tu conquista en Vincere Colors
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button variant="primary" size="lg">
                  Crear Cuenta
                </Button>
              </Link>
              <Link to="/wiki">
                <Button variant="outline" size="lg">
                  Explorar Wiki
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}