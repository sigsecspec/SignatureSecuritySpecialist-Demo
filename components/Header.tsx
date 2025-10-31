
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavLink: React.FC<{ to: string; children: React.ReactNode; onClick?: () => void }> = ({ to, children, onClick }) => (
  <Link to={to} onClick={onClick} className="text-sss-white hover:text-sss-sage transition-colors duration-300 py-2">
    {children}
  </Link>
);

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuToggle = () => setIsMenuOpen(!isMenuOpen);

  // Simplified header for dashboard view
  if (user && (location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/training-center') || location.pathname.startsWith('/payroll') || location.pathname.startsWith('/uniforms') || location.pathname.startsWith('/profile'))) {
    return (
       <header className="bg-white text-sss-ebony shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex items-center justify-end h-16">
            <div className="flex items-center space-x-4">
               {/* Fix: Conditionally render rank to avoid extra spacing for users without one. */}
               <span className="font-semibold text-right">
                {user.name}
                {user.rank && (
                  <>
                    <br/>
                    <span className="text-sm text-sss-sage font-bold">{user.rank}</span>
                  </>
                )}
               </span>
                 <button onClick={handleLogout} className="bg-sss-grey hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 text-sm">
                  Log Out
                </button>
            </div>
           </div>
        </div>
      </header>
    )
  }

  // Full header for public pages
  return (
    <header className="bg-sss-ebony text-sss-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold">
              Sig<span className="text-sss-sage">Sec</span>Spec
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/how-it-works">How It Works</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="bg-sss-sage hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-md transition-all duration-300">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="bg-sss-grey hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-md transition-all duration-300">
                  Log Out
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-sss-sage hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-md transition-all duration-300">
                Log In
              </Link>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={menuToggle} className="text-sss-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-sss-ebony bg-opacity-95">
          <div className="px-4 pt-2 pb-4 flex flex-col items-center space-y-4">
            <NavLink to="/" onClick={menuToggle}>Home</NavLink>
            <NavLink to="/about" onClick={menuToggle}>About Us</NavLink>
            <NavLink to="/how-it-works" onClick={menuToggle}>How It Works</NavLink>
            <NavLink to="/contact" onClick={menuToggle}>Contact</NavLink>
            <div className="flex flex-col items-center space-y-4 w-full">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={menuToggle} className="bg-sss-sage hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 w-full text-center">
                    Dashboard
                  </Link>
                  <button onClick={() => { handleLogout(); menuToggle(); }} className="bg-sss-grey hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 w-full">
                    Log Out
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={menuToggle} className="bg-sss-sage hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 w-full text-center">
                  Log In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;