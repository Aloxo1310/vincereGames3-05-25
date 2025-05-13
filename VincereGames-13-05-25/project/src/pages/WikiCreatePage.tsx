import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { createWikiArticle } from '../lib/supabase';
import { BookOpen, Save, AlertCircle } from 'lucide-react';

export default function WikiCreatePage() {
  useEffect(() => {
    document.title = 'Vincere Colors - Crear Artículo Wiki';
  }, []);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const wikiCategories = [
    { id: 'gameplay', name: 'Mecánicas del Juego' },
    { id: 'units', name: 'Unidades y Personajes' },
    { id: 'buildings', name: 'Edificios y Estructuras' },
    { id: 'resources', name: 'Recursos y Economía' },
    { id: 'history', name: 'Contexto Histórico' },
    { id: 'strategy', name: 'Guías de Estrategia' },
  ];

  const [selectedCategory, setSelectedCategory] = useState(wikiCategories[0].id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError('El título y el contenido son obligatorios.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const { data, error } = await createWikiArticle(title, content, selectedCategory);

      if (error) {
        throw new Error(error.message);
      }

      navigate(`/wiki/article/${data?.id}`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen pt-16"
      style={{
        backgroundImage: 'url("https://vinceregames-441081885.imgix.net/backgroundprofile")', // Cambia esta URL manualmente
      }}
    >
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl border-2 border-gray-800 p-10 space-y-8"
          style={{
            backgroundImage: 'linear-gradient(135deg, #1c1c1c, #2b2b2b)', // Estilo de fibra de carbono
          }}
        >
          <div className="flex items-center mb-6">
            <BookOpen className="h-10 w-10 text-black mr-3" />
            <h1 className="text-4xl font-serif font-bold text-white">
              Crear Artículo Wiki
            </h1>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-red-100 border-2 border-red-300 text-red-800 rounded-lg flex items-start"
            >
              <AlertCircle className="h-6 w-6 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Campo de Título */}
            <div>
              <Input
                label="Título del Artículo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ingresa un título descriptivo"
                fullWidth
                required
              />
            </div>

            {/* Campo de Categoría */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Categoría
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 w-full bg-gray-800 text-white rounded-lg border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm"
              >
                {wikiCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Campo de Contenido */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Contenido
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Escribe el contenido de tu artículo aquí..."
                className="px-4 py-3 w-full bg-gray-800 text-white rounded-lg border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-[300px] resize-y shadow-sm"
                required
              />
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => navigate('/wiki')}
                className="bg-gray-700 hover:bg-gray-600 text-white border-2 border-gray-600 rounded-lg"
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                type="submit"
                loading={loading}
                disabled={!title || !content || loading}
                className="bg-black hover:bg-gray-900 text-white border-2 border-black rounded-lg"
              >
                <Save size={18} className="mr-2" />
                Publicar Artículo
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}