import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { BookOpen, Plus, Info, FileText, Search } from 'lucide-react';

export default function WikiPage() {
  useEffect(() => {
    document.title = 'Vincere Colors - Wiki';
  }, []);

  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const wikiCategories = [
    { id: 'gameplay', name: 'Mecánicas del Juego' },
    { id: 'units', name: 'Unidades y Personajes' },
    { id: 'buildings', name: 'Edificios y Estructuras' },
    { id: 'resources', name: 'Recursos y Economía' },
    { id: 'history', name: 'Contexto Histórico' },
    { id: 'strategy', name: 'Guías de Estrategia' },
  ];

  const wikiArticles = [
    {
      id: 1,
      title: 'Primeros pasos en Vincere Colors',
      summary: 'Guía para principiantes sobre las mecánicas básicas del juego.',
      category: 'gameplay',
      author: 'GameMaster',
      date: '15/03/2025',
    },
    {
      id: 2,
      title: 'Guía de Unidades Militares',
      summary: 'Información completa sobre unidades militares, sus fortalezas y usos estratégicos.',
      category: 'units',
      author: 'CommanderX',
      date: '12/03/2025',
    },
    {
      id: 3,
      title: 'Edificios esenciales para el crecimiento económico',
      summary: 'Aprende qué edificios priorizar para una economía sólida al inicio del juego.',
      category: 'buildings',
      author: 'ArchitectPro',
      date: '10/03/2025',
    },
    {
      id: 4,
      title: 'Gestión de recursos 101',
      summary: 'Consejos para recolectar y gestionar recursos de manera eficiente.',
      category: 'resources',
      author: 'ResourceGuru',
      date: '08/03/2025',
    },
    {
      id: 5,
      title: 'Influencia romana en el diseño del juego',
      summary: 'Cómo la cultura romana y sus tácticas militares influyeron en el diseño del juego.',
      category: 'history',
      author: 'HistorianX',
      date: '05/03/2025',
    },
    {
      id: 6,
      title: 'Estrategias avanzadas de combate',
      summary: 'Domina el campo de batalla con estas técnicas y formaciones avanzadas.',
      category: 'strategy',
      author: 'BattleMaster',
      date: '01/03/2025',
    },
  ];

  const filteredArticles = searchTerm
    ? wikiArticles.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : wikiArticles;

  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-cream-50 min-h-screen pt-16">
      {/* Sección Hero */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-amber-900 to-amber-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/207662/pexels-photo-207662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Fondo de la wiki"
            className="w-full h-full object-cover"
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
            Vincere <span className="text-gold-400">Wiki</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-cream-100 max-w-3xl mx-auto mb-8"
          >
            Tu guía completa para todo lo relacionado con Vincere Colors
          </motion.p>

          <div className="max-w-md mx-auto relative mt-8">
            <input
              type="text"
              placeholder="Busca artículos en la wiki..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 pr-4 rounded-full bg-cream-100/90 border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-amber-900 placeholder-amber-700/50"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-amber-700" />
          </div>

          {/* Botón de Crear Artículo */}
          {user && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 flex justify-center"
            >
              <Link to="/wiki/create">
                <Button variant="primary" size="lg">
                  <Plus size={20} className="mr-2" />
                  Crear Artículo
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contenido de la Wiki */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Barra Lateral */}
            <div className="lg:w-1/4">
              <div className="bg-cream-100 rounded-lg p-4 shadow-md border border-amber-200 sticky top-20">
                <h2 className="text-xl font-serif font-bold text-amber-900 mb-4">Categorías</h2>
                <ul className="space-y-2">
                  {wikiCategories.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => setSearchTerm(category.name)}
                        className={`w-full text-left px-3 py-2 rounded-md ${
                          searchTerm === category.name
                            ? 'bg-amber-800 text-cream-50'
                            : 'text-amber-800 hover:bg-amber-50'
                        } transition-colors`}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contenido Principal */}
            <div className="lg:w-3/4">
              <h2 className="text-2xl font-serif font-bold text-amber-900 mb-6">
                {searchTerm ? `Resultados: "${searchTerm}"` : 'Artículos Recientes'}
              </h2>

              {paginatedArticles.length === 0 ? (
                <div className="bg-cream-100 rounded-lg p-6 shadow-md border border-amber-200 text-center">
                  <BookOpen size={40} className="mx-auto text-amber-800 mb-4" />
                  <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">
                    No se encontraron artículos
                  </h3>
                  <p className="text-amber-800 mb-4">
                    No pudimos encontrar artículos que coincidan con tu búsqueda.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paginatedArticles.map((article) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3 }}
                      className="bg-cream-100 rounded-lg overflow-hidden shadow-md border border-amber-200 hover:shadow-lg hover:scale-105 transition-transform"
                    >
                      <div className="p-6">
                        <Link to={`/wiki/article/${article.id}`}>
                          <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">
                            {article.title}
                          </h3>
                        </Link>
                        <p className="text-amber-800 mb-4">{article.summary}</p>
                        <div className="flex justify-between items-center text-sm text-amber-700">
                          <span>Por {article.author}</span>
                          <span>{article.date}</span>
                        </div>
                        <Link to={`/wiki/article/${article.id}`}>
                          <Button size="sm" variant="ghost" className="mt-4">
                            <FileText size={16} className="mr-1" /> Leer más
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePageChange(idx + 1)}
                      className={`px-4 py-2 rounded-md ${
                        currentPage === idx + 1
                          ? 'bg-amber-800 text-cream-50'
                          : 'bg-cream-100 text-amber-900 hover:bg-amber-50'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}