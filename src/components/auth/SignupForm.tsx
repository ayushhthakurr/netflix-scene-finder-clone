import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface SignupFormProps {
  onSignup: (email: string, password: string, name: string) => void;
  error: string | null;
  loading: boolean;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup, error, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup(email, password, name);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-black/75 p-8 md:p-16 rounded">
      <h1 className="text-white text-3xl font-bold mb-2">Sign Up</h1>
      <p className="text-gray-400 mb-6">Create your Netflix account</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-netflix-red/20 text-netflix-red border border-netflix-red/50 rounded text-sm">
            {error}
          </div>
        )}
        
        {/* Name Input */}
        <div className="relative">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-[#333] text-white px-4 pt-5 pb-2 rounded focus:outline-none focus:ring-1 focus:ring-netflix-red"
            placeholder=" "
          />
          <label 
            htmlFor="name"
            className={`absolute text-gray-400 left-4 top-4 transition-all ${
              name ? 'text-xs top-1' : ''
            }`}
          >
            Name
          </label>
        </div>
        
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
            Email
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
            minLength={6}
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
              Creating Account...
            </div>
          ) : 'Sign Up'}
        </button>
      </form>
      
      {/* Sign in link */}
      <div className="mt-16 text-gray-500">
        <p>
          Already have an account?{' '}
          <Link to="/login" className="text-white hover:underline">
            Sign in
          </Link>.
        </p>
        
        <p className="mt-4 text-xs">
          By signing up, you agree to our <a href="#" className="text-blue-500 hover:underline">Terms of Use</a> and <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default SignupForm;