import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, AlertCircle, Eye, EyeOff, Shield } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const navigate = useNavigate();
  const { signIn, resetPassword, user, setMockUser } = useAuth();

  useEffect(() => {
    document.title = 'Vincere Colors - Iniciar Sesión';
    if (user) navigate('/profile');
  }, [user, navigate]);

  const handleInputChange = (field: string, value: any) => {
    setFormState((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formState.email.includes('@')) {
      setError('Por favor, ingresa un correo válido.');
      return;
    }

    if (formState.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await signIn(formState.email, formState.password);
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setError('Correo electrónico o contraseña incorrectos.');
        } else {
          setError('Error al iniciar sesión. Intenta de nuevo.');
        }
      } else {
        toast.success('Inicio de sesión exitoso');
        navigate('/profile');
      }
    } catch (err) {
      setError('Ha ocurrido un error inesperado.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formState.email.includes('@')) {
      setError('Por favor, ingresa un correo válido.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await resetPassword(formState.email);
      if (error) {
        setError('Error al enviar las instrucciones. Intenta de nuevo.');
      } else {
        setResetSent(true);
        toast.success('Instrucciones enviadas a tu correo');
      }
    } catch (err) {
      setError('Ha ocurrido un error inesperado.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://vinceregames-441081885.imgix.net/backgroundprofile')] bg-cover bg-center bg-no-repeat pt-16 flex items-center justify-center">
      <div className="max-w-md w-full px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-cream-100/90 backdrop-blur-md p-8 rounded-lg shadow-2xl border-2 border-amber-300"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="w-20 h-20 mx-auto mb-4 bg-amber-800 rounded-full flex items-center justify-center shadow-lg"
            >
              <Shield className="w-12 h-12 text-gold-400" />
            </motion.div>
            <h1 className="text-3xl font-serif font-bold text-amber-900 mb-2">
              {forgotPassword ? 'Restablecer Contraseña' : 'Ave, Legionario'}
            </h1>
            <p className="text-amber-800 font-body">
              {forgotPassword
                ? 'Ingresa tu correo para recibir instrucciones'
                : 'Inicia sesión en tu cuenta de Vincere'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-3 bg-red-100 border border-red-300 text-red-800 rounded-md flex items-start"
              >
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {resetSent && (
            <div className="mb-6 p-3 bg-green-100 border border-green-300 text-green-800 rounded-md">
              Se han enviado las instrucciones para restablecer la contraseña a tu correo.
            </div>
          )}

          {forgotPassword ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <Input
                label="Correo Electrónico"
                type="email"
                value={formState.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Ingresa tu correo"
                required
                fullWidth
                icon={<Mail className="h-5 w-5 text-amber-500" />}
              />
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
                disabled={loading}
              >
                Enviar Instrucciones
              </Button>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setForgotPassword(false)}
                  className="text-amber-600 hover:text-amber-700 text-sm"
                >
                  Volver a Iniciar Sesión
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="Correo Electrónico"
                type="email"
                value={formState.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Ingresa tu correo"
                required
                fullWidth
                icon={<Mail className="h-5 w-5 text-amber-500" />}
              />
              <div className="relative">
                <Input
                  label="Contraseña"
                  type={formState.showPassword ? 'text' : 'password'}
                  value={formState.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  required
                  fullWidth
                  icon={<Lock className="h-5 w-5 text-amber-500" />}
                />
                <button
                  type="button"
                  onClick={() =>
                    setFormState((prev) => ({
                      ...prev,
                      showPassword: !prev.showPassword,
                    }))
                  }
                  className="absolute right-3 top-10 text-amber-600 hover:text-amber-700"
                  aria-label={
                    formState.showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                  }
                >
                  {formState.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setForgotPassword(true)}
                  className="text-amber-600 hover:text-amber-700 text-sm"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
                disabled={loading}
              >
                Iniciar Sesión
              </Button>

              <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={() => {
                  const mockUser = {
                    id: 'dev123',
                    username: 'DevUser',
                    email: 'dev@vincere.com',
                    avatar_url: 'https://via.placeholder.com/150',
                    name_color: '#FF5733',
                    created_at: new Date().toISOString(),
                  };
                  setMockUser(mockUser);
                  navigate('/profile');
                }}
                className="bg-gray-100 hover:bg-gray-200"
              >
                Modo Dev
              </Button>

              <div className="text-center">
                <p className="text-amber-800 text-sm">
                  ¿No tienes una cuenta?{' '}
                  <Link
                    to="/register"
                    className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
                  >
                    Regístrate
                  </Link>
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}