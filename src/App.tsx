import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MovieDetail from './pages/MovieDetail';
import Watch from './pages/Watch';
import SceneFinder from './pages/SceneFinder';

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-netflix-black">
        <div className="animate-spin h-10 w-10 border-4 border-netflix-red border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

function App() {
  const { user, loading, logout } = useAuth();
  
  // Custom routes that don't need the header/footer
  const noHeaderFooterRoutes = ['/watch'];
  const noHeaderFooterRoutesMatch = (path: string) => 
    noHeaderFooterRoutes.some(route => path.startsWith(route));
  
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-netflix bg-netflix-black text-white">
        {!loading && (
          <Routes>
            <Route 
              path="*" 
              element={
                <LayoutWrapper>
                  <Routes>
                    <Route path="/" element={
                      <ProtectedRoute>
                        <Home />
                      </ProtectedRoute>
                    } />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/movie/:id" element={
                      <ProtectedRoute>
                        <MovieDetail />
                      </ProtectedRoute>
                    } />
                    <Route path="/watch/:id" element={
                      <ProtectedRoute>
                        <Watch />
                      </ProtectedRoute>
                    } />
                    <Route path="/scene-finder" element={
                      <ProtectedRoute>
                        <SceneFinder />
                      </ProtectedRoute>
                    } />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </LayoutWrapper>
              } 
            />
          </Routes>
        )}
      </div>
    </Router>
  );
  
  function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = window.location.pathname;
    const showHeaderFooter = !noHeaderFooterRoutesMatch(pathname);
    
    return (
      <>
        {showHeaderFooter && <Header user={user} onLogout={logout} />}
        <main className="flex-grow">
          {children}
        </main>
        {showHeaderFooter && <Footer />}
      </>
    );
  }
}

export default App;