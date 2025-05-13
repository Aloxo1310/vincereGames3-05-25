import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-amber-900 text-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold">VINCERE GAMES</h3>
            <p className="text-cream-100">
              Creando experiencias inmersivas de juego con inspiración histórica.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cream-100 hover:text-gold-400">
                <Facebook />
              </a>
              <a href="#" className="text-cream-100 hover:text-gold-400">
                <Twitter />
              </a>
              <a href="#" className="text-cream-100 hover:text-gold-400">
                <Instagram />
              </a>
              <a href="#" className="text-cream-100 hover:text-gold-400">
                <Youtube />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Juegos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/game" className="text-cream-100 hover:text-gold-400">
                  Vincere Colors
                </Link>
              </li>
              <li>
                <a href="#" className="text-cream-100 hover:text-gold-400">
                  Próximos Lanzamientos
                </a>
              </li>
              <li>
                <Link to="/store" className="text-cream-100 hover:text-gold-400">
                  Tienda
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/wiki" className="text-cream-100 hover:text-gold-400">
                  Wiki
                </Link>
              </li>
              <li>
                <a href="#" className="text-cream-100 hover:text-gold-400">
                  Soporte
                </a>
              </li>
              <li>
                <a href="#" className="text-cream-100 hover:text-gold-400">
                  Comunidad
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Compañía</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-cream-100 hover:text-gold-400">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="text-cream-100 hover:text-gold-400">
                  Empleo
                </a>
              </li>
              <li>
                <a href="#" className="text-cream-100 hover:text-gold-400">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="text-cream-100 hover:text-gold-400">
                  Kit de Prensa
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-amber-800">
          <p className="text-center text-cream-100">
            &copy; {new Date().getFullYear()} Vincere Games. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}