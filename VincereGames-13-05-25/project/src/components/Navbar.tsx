import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User, ShoppingCart, BookOpen, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-black/90 backdrop-blur-sm shadow-md fixed w-full z-50 border-b border-gold-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src="https://vinceregames-441081885.imgix.net/Navbarlogo.png" alt="Vincere Games" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-cream-50 hover:text-gold-400 px-3 py-2 rounded-md text-sm font-display">
              Inicio
            </Link>
            <Link to="/game" className="text-cream-50 hover:text-gold-400 px-3 py-2 rounded-md text-sm font-display">
              Vincere Colors
            </Link>
            <Link to="/store" className="text-cream-50 hover:text-gold-400 px-3 py-2 rounded-md text-sm font-display">
              Tienda
            </Link>
            <Link to="/wiki" className="text-cream-50 hover:text-gold-400 px-3 py-2 rounded-md text-sm font-display">
              Wiki
            </Link>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-cream-50 hover:text-gold-400 px-3 py-2 rounded-md text-sm font-display"
                >
                  {user.username || 'Perfil'}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-black border border-gold-400/20"
                    >
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-cream-50 hover:bg-gold-400/10 font-display"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Tu Perfil
                      </Link>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-cream-50 hover:bg-gold-400/10 font-display"
                      >
                        Cerrar Sesión
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login">
                <Button size="sm" variant="primary">
                  Iniciar Sesión
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-cream-50 hover:text-gold-400 hover:bg-black/50"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-sm"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link 
                to="/" 
                className="flex items-center text-cream-50 hover:text-gold-400 block px-3 py-2 rounded-md text-base font-display"
                onClick={() => setIsOpen(false)}
              >
                <Home className="mr-2 h-5 w-5" /> Inicio
              </Link>
              <Link 
                to="/game" 
                className="flex items-center text-cream-50 hover:text-gold-400 block px-3 py-2 rounded-md text-base font-display"
                onClick={() => setIsOpen(false)}
              >
                <BookOpen className="mr-2 h-5 w-5" /> Vincere Colors
              </Link>
              <Link 
                to="/store" 
                className="flex items-center text-cream-50 hover:text-gold-400 block px-3 py-2 rounded-md text-base font-display"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Tienda
              </Link>
              <Link 
                to="/wiki" 
                className="flex items-center text-cream-50 hover:text-gold-400 block px-3 py-2 rounded-md text-base font-display"
                onClick={() => setIsOpen(false)}
              >
                <BookOpen className="mr-2 h-5 w-5" /> Wiki
              </Link>

              {user ? (
                <>
                  <Link 
                    to="/profile" 
                    className="flex items-center text-cream-50 hover:text-gold-400 block px-3 py-2 rounded-md text-base font-display"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="mr-2 h-5 w-5" /> Perfil
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    className="flex items-center w-full text-left text-cream-50 hover:text-gold-400 block px-3 py-2 rounded-md text-base font-display"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="block w-full px-3 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Button fullWidth variant="primary">
                    Iniciar Sesión
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}