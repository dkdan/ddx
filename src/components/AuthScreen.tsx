import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Lock, Eye, EyeOff, Check, X, Loader2, Phone } from 'lucide-react';
import { signIn, signUp } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const [passwordCriteria, setPasswordCriteria] = useState({
    hasMinLength: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false
  });

  useEffect(() => {
    setPasswordCriteria({
      hasMinLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    });
  }, [password]);

  const passwordStrength = Object.values(passwordCriteria).filter(Boolean).length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        if (passwordStrength < 4) {
          throw new Error('Please ensure your password meets all security requirements');
        }
        if (!phone.match(/^\+?[1-9]\d{1,14}$/)) {
          throw new Error('Please enter a valid phone number');
        }
        await signUp(email, password, name, phone);
      }
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Authentication error:', err);
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Side - Hero Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:w-1/2 p-12 flex flex-col justify-center text-white"
        >
          <h1 className="text-5xl font-bold mb-6">
            Secure Crypto Bill Payments
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Pay bills instantly with cryptocurrency. Fast, secure, and reliable.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-blue-800/50 p-6 rounded-xl">
              <h3 className="text-2xl font-bold mb-2">24/7</h3>
              <p>Always available for your payments</p>
            </div>
            <div className="bg-blue-800/50 p-6 rounded-xl">
              <h3 className="text-2xl font-bold mb-2">Secure</h3>
              <p>Enterprise-grade security</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Auth Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:w-1/2 bg-white p-12 rounded-t-[3rem] lg:rounded-l-[3rem] lg:rounded-tr-none"
        >
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                    required={!isLogin}
                    disabled={loading}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                  />
                  <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                      required={!isLogin}
                      disabled={loading}
                    />
                    <Phone className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {!isLogin && (
                  <div className="mt-4 space-y-3">
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        {passwordCriteria.hasMinLength ? 
                          <Check size={16} className="text-green-500 mr-2" /> : 
                          <X size={16} className="text-gray-400 mr-2" />}
                        At least 8 characters
                      </li>
                      <li className="flex items-center text-sm">
                        {passwordCriteria.hasUppercase ? 
                          <Check size={16} className="text-green-500 mr-2" /> : 
                          <X size={16} className="text-gray-400 mr-2" />}
                        At least one uppercase letter
                      </li>
                      <li className="flex items-center text-sm">
                        {passwordCriteria.hasNumber ? 
                          <Check size={16} className="text-green-500 mr-2" /> : 
                          <X size={16} className="text-gray-400 mr-2" />}
                        At least one number
                      </li>
                      <li className="flex items-center text-sm">
                        {passwordCriteria.hasSpecialChar ? 
                          <Check size={16} className="text-green-500 mr-2" /> : 
                          <X size={16} className="text-gray-400 mr-2" />}
                        At least one special character
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-xl flex items-center justify-center font-semibold hover:bg-blue-700 transition-colors"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="mr-2 animate-spin" />
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </>
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={20} className="ml-2" />
                  </>
                )}
              </button>

              <p className="text-center text-gray-600 mt-6">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 font-medium hover:text-blue-700"
                  type="button"
                  disabled={loading}
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthScreen;