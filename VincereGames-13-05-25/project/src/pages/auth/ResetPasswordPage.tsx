import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { supabase } from '../../lib/supabase';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function ResetPasswordPage() {
  useEffect(() => {
    document.title = 'Vincere Colors - Reset Password';
  }, []);
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();
  
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    setError(null);
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });
      
      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-cream-50 pt-16 flex items-center justify-center">
      <div className="max-w-md w-full px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-cream-100 p-8 rounded-lg shadow-lg border border-amber-200"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-amber-900 mb-2">
              Reset Password
            </h1>
            <p className="text-amber-800">
              Create a new password for your account
            </p>
          </div>
          
          {error && (
            <div className="mb-6 p-3 bg-red-100 border border-red-300 text-red-800 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          
          {success ? (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-serif font-bold text-amber-900 mb-2">
                Password Reset Successful
              </h2>
              <p className="text-amber-800 mb-4">
                Your password has been reset successfully. You will be redirected to the login page shortly.
              </p>
              <Button
                variant="primary"
                onClick={() => navigate('/login')}
              >
                Go to Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleResetPassword}>
              <div className="space-y-4">
                <div>
                  <Input
                    label="New Password"
                    type="password"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    fullWidth
                  />
                </div>
                
                <div>
                  <Input
                    label="Confirm New Password"
                    type="password"
                    placeholder="Confirm your new password"
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
                  disabled={!password || !confirmPassword || loading}
                >
                  Reset Password
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}