import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  error: string | null;
  loading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, error, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-black/75 p-8 md:p-16 rounded">
      <h1 className="text-white text-3xl font-bold mb-6">Sign In</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-netflix-red/20 text-netflix-red border border-netflix-red/50 rounded text-sm">
            {error}
          </div>
        )}
        
        {/* Email Input */}
        <div className="relative">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-[#333] text-white px-4 pt-5 pb-2 rounded focus:outline-none focus:ring-1 focus:ring-netflix-red"
            placeholder=" "
          />
          <label 
            htmlFor="email"
            className={`absolute text-gray-400 left-4 top-4 transition-all ${
              email ? 'text-xs top-1' : ''
            }`}
          >
            Email or phone number
          </label>
        </div>
        
        {/* Password Input */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-[#333] text-white px-4 pt-5 pb-2 rounded focus:outline-none focus:ring-1 focus:ring-netflix-red"
            placeholder=" "
          />
          <label 
            htmlFor="password"
            className={`absolute text-gray-400 left-4 top-4 transition-all ${
              password ? 'text-xs top-1' : ''
            }`}
          >
            Password
          </label>
          
          {password && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-4 text-gray-400 text-sm"
            >
              {showPassword ? 'HIDE' : 'SHOW'}
            </button>
          )}
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 mt-6 rounded font-medium ${
            loading 
              ? 'bg-netflix-red/60 cursor-not-allowed' 
              : 'bg-netflix-red hover:bg-red-700 transition'
          } text-white`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin h-5 w-5 border-2 border-white/20 border-t-white rounded-full mr-2"></div>
              Signing In...
            </div>
          ) : 'Sign In'}
        </button>
        
        {/* Remember me / Need help */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 bg-gray-700 border-0 rounded mr-2"
            />
            <label htmlFor="remember" className="text-gray-400">Remember me</label>
          </div>
          
          <a href="#" className="text-gray-400 hover:underline">Need help?</a>
        </div>
      </form>
      
      {/* Sign up link */}
      <div className="mt-16 text-gray-500">
        <p>
          New to Netflix?{' '}
          <Link to="/signup" className="text-white hover:underline">
            Sign up now
          </Link>.
        </p>
        
        <p className="mt-4 text-xs">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
          <a href="#" className="text-blue-500 hover:underline">Learn more.</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;