import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  useEffect(() => {
    document.title = 'Vincere Colors - Crear Cuenta';
  }, []);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { signUp, user } = useAuth();
  
  useEffect(() => {
    // Si el usuario ya está logueado, redirigir al perfil
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    setError(null);
    setLoading(true);
    
    try {
      const { error } = await signUp(email, password, username);
      
      if (error) {
        // Verificar específicamente si el correo ya está registrado
        if (error.message === 'User already registered') {
          setError('Este correo ya está registrado. Por favor, inicia sesión o usa un correo diferente.');
        } else {
          setError(error.message);
        }
      } else {
        // Registro exitoso
        navigate('/profile');
      }
    } catch (err) {
      setError('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-black pt-16 flex items-center justify-center">
      <div className="max-w-md w-full px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-white mb-2">
              Crear Cuenta
            </h1>
            <p className="text-gray-400">
              Únete a la comunidad de Vincere
            </p>
          </div>
          
          {error && (
            <div className="mb-6 p-3 bg-red-500/20 border border-red-500 text-red-400 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleRegister}>
            <div className="space-y-4">
              <div>
                <Input
                  label="Nombre de Usuario"
                  type="text"
                  placeholder="Elige un nombre de usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  fullWidth
                />
              </div>
              
              <div>
                <Input
                  label="Correo Electrónico"
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                />
              </div>
              
              <div>
                <Input
                  label="Contraseña"
                  type="password"
                  placeholder="Crea una contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                />
              </div>
              
              <div>
                <Input
                  label="Confirmar Contraseña"
                  type="password"
                  placeholder="Confirma tu contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  fullWidth
                />
              </div>
              
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
                disabled={!email || !password || !confirmPassword || !username || loading}
              >
                Crear Cuenta
              </Button>
              
              <div className="text-center pt-2">
                <p className="text-gray-400 text-sm">
                  ¿Ya tienes una cuenta?{' '}
                  <Link to="/login" className="text-gray-200 hover:text-white font-medium">
                    Inicia Sesión
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}