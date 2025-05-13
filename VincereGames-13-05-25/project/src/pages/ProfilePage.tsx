import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import {
  User,
  Mail,
  Key,
  Settings,
  Activity,
  Upload,
  Image
} from 'lucide-react';
import { updateProfile, getProfile, changePassword, uploadAvatar } from '../lib/supabase';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile');
  const [formState, setFormState] = useState({
    username: user?.username || '',
    email: user?.email || '',
    nameColor: user?.name_color || '#B45309',
    avatarUrl: user?.avatar_url || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [activityLog, setActivityLog] = useState<any[]>([]); // Simulated activity log
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    document.title = 'Vincere Colors - Tu Perfil';
    if (!user) {
      navigate('/login');
    } else {
      const fetchProfile = async () => {
        const { data, error } = await getProfile();
        if (!error && data) {
          setFormState({
            username: data.username || '',
            email: data.email || '',
            nameColor: data.name_color || '#B45309',
            avatarUrl: data.avatar_url || '',
          });
        }

        // Simulated activity log for now
        setActivityLog([
          { id: 1, action: 'Inicio de sesión', timestamp: '2025-05-10 10:00:00' },
          { id: 2, action: 'Actualización de perfil', timestamp: '2025-05-09 15:23:00' },
          { id: 3, action: 'Cambio de contraseña', timestamp: '2025-05-08 18:45:00' },
        ]);
      };
      fetchProfile();
    }
  }, [user, navigate]);

  const handleInputChange = (field: string, value: any) => {
    setFormState((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleUpdateProfile = async () => {
    setError(null);
    setLoading(true);

    try {
      const { error: updateError } = await updateProfile(formState);
      if (updateError) throw new Error('Error al actualizar el perfil');

      toast.success('Perfil actualizado exitosamente');
    } catch (err) {
      setError((err as Error).message);
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    try {
      const { error } = await changePassword(newPassword);
      if (error) {
        toast.error('Error al cambiar la contraseña');
      } else {
        toast.success('Contraseña actualizada exitosamente');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      toast.error('Error inesperado al cambiar la contraseña');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Sesión cerrada exitosamente');
      navigate('/login');
    } catch (err) {
      toast.error('Error al cerrar sesión');
    }
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) {
      toast.error('Selecciona un archivo antes de subirlo');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await uploadAvatar(avatarFile);
      if (error || !data) {
        throw new Error('Error al subir la foto de perfil');
      }

      // Actualizar el avatarURL en el estado del perfil
      setFormState((prevState) => ({ ...prevState, avatarUrl: data }));
      toast.success('Foto de perfil actualizada exitosamente');
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
      setAvatarFile(null);
    }
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div
      className="bg-cover bg-center min-h-screen pt-16"
      style={{
        backgroundImage: 'url("https://vinceregames-441081885.imgix.net/luces-doradas-en-fondo-oscuro.jpg")',
      }}
    >
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-gradient-to-br from-yellow-50 via-white to-yellow-100 rounded-lg shadow-lg border border-yellow-300 p-4">
              <nav className="space-y-2">
                {['profile', 'account', 'security', 'settings', 'history'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                      activeTab === tab
                        ? 'bg-yellow-200 text-yellow-900 font-semibold border-l-4 border-yellow-500'
                        : 'text-yellow-700 hover:bg-yellow-100'
                    }`}
                  >
                    {tab === 'profile' && <User size={18} className="mr-2" />}
                    {tab === 'account' && <Mail size={18} className="mr-2" />}
                    {tab === 'security' && <Key size={18} className="mr-2" />}
                    {tab === 'settings' && <Settings size={18} className="mr-2" />}
                    {tab === 'history' && <Activity size={18} className="mr-2" />}
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
              <div className="mt-6 pt-6 border-t border-yellow-300">
                <Button variant="outline" fullWidth onClick={handleSignOut}>
                  Salir
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-gradient-to-br from-yellow-50 via-white to-yellow-100 rounded-lg shadow-md border border-yellow-300 p-6">
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h2 className="text-3xl font-serif font-bold text-yellow-900">Tu Perfil</h2>
                  <div className="flex items-center space-x-4">
                    <img
                      src={formState.avatarUrl || '/default-avatar.png'}
                      alt="Avatar"
                      className="w-16 h-16 rounded-full border border-yellow-300"
                    />
                    <label className="flex items-center space-x-2">
                      <Upload size={18} className="text-yellow-800" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <span className="text-yellow-700 cursor-pointer hover:underline">
                        Cambiar foto de perfil
                      </span>
                    </label>
                  </div>
                  <Button
                    variant="primary"
                    onClick={handleAvatarUpload}
                    disabled={loading || !avatarFile}
                    loading={loading}
                  >
                    Subir Foto
                  </Button>
                  <Input
                    label="Nombre de Usuario"
                    value={formState.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                  />
                  <Input
                    label="Color del Nombre"
                    type="color"
                    value={formState.nameColor}
                    onChange={(e) => handleInputChange('nameColor', e.target.value)}
                  />
                  <Button
                    variant="primary"
                    onClick={handleUpdateProfile}
                    disabled={loading}
                    loading={loading}
                  >
                    Guardar Cambios
                  </Button>
                </motion.div>
              )}

              {/* Other tabs remain unchanged */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}