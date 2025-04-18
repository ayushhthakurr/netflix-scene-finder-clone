import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../components/auth/SignupForm';
import { useAuth } from '../hooks/useAuth';

const Signup: React.FC = () => {
  const { signup, loading, error, user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center p-4" style={{
      backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/2507025/pexels-photo-2507025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"
    }}>
      {/* This div would be inside the Header component in the full implementation */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center p-6">
        <div>
          <svg 
            viewBox="0 0 111 30" 
            className="h-6 md:h-8 fill-netflix-red" 
            aria-hidden="true" 
            focusable="false"
          >
            <g><path d="M105.06 14.28L111 30c-1.75-.25-3.499-.563-5.28-.845l-3.345-8.686-3.437 7.969c-1.7-.24-3.375-.507-5.047-.78l6.533-15.523-6.534-15.524 4.998 3.17 3.317 8.638 3.29-8.638 5.049 2.32zM61.063 0L67.425 14.322l-.2.003h7.618l.183-.003L61.063 0zm0 30l13.963-15.677h-7.801L61.063 30zm-8.056 0l6.161-14.323-6.161-14.325z"></path><path d="M93.676 29.361c-10.883 0-20.188-7.553-20.188-16.861 0-9.307 9.305-16.86 20.188-16.86 10.883 0 20.189 7.553 20.189 16.86 0 9.308-9.306 16.861-20.189 16.861zm0-29.045c-7.607 0-13.787 5.466-13.787 12.185 0 6.72 6.18 12.184 13.787 12.184s13.787-5.465 13.787-12.184c0-6.72-6.18-12.185-13.787-12.185zM23.55 0v30h6.401V0zM32.507 0v30h6.401V0zM59.674 0v30h6.401V0zM50.717 0v30h6.401V0zM0 0v30h6.401V0zM8.957 0v30h6.401V0zM41.465 0v30h6.401V0z"></path></g>
          </svg>
        </div>
      </div>
      
      {/* Signup Form */}
      <SignupForm 
        onSignup={signup}
        error={error}
        loading={loading}
      />
    </div>
  );
};

export default Signup;