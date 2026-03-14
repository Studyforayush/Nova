import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useGlobalContext } from "../GlobalContext";

function NavbarMain() {
  const [isOpen, setIsOpen] = useState(false);
  const { userAuth, setUserAuth, setLogin, user, navigate } = useGlobalContext();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserAuth(false);
    setLogin(false);
    navigate('/');
  };

  return (
    <nav className="bg-black border-b border-[#2a2a2a] w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-3">
              <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
              <span className="text-white text-xl font-bold tracking-tight">E-Learning</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
              <Link to="/about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">About</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</Link>
              {userAuth && (
                <Link 
                  to={user?.role === 'student' ? '/studentMain' : '/teacherMain'} 
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {userAuth ? (
              <>
                <span className="text-gray-400 text-sm">Hi, {user?.name || 'User'}</span>
                <button 
                  onClick={handleLogout}
                  className="text-white border border-[#2a2a2a] hover:bg-[#1a1a1a] px-4 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white border border-[#2a2a2a] hover:bg-[#1a1a1a] px-4 py-2 rounded-lg text-sm font-medium transition-all">
                  Login
                </Link>
                <Link to="/ask" className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                  Sign up
                </Link>
              </>
            )}
          </div>

          <div className="-mr-2 flex md:hidden">
            {userAuth && <span className="text-gray-400 text-xs mr-2 self-center">{user?.name}</span>}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#1a1a1a] focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-[#2a2a2a] bg-[#111111]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/about" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</Link>
            <Link to="/contact" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact Us</Link>
            {userAuth && (
              <Link 
                to={user?.role === 'student' ? '/studentMain' : '/teacherMain'} 
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Dashboard
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-[#2a2a2a] px-5 space-y-3">
            {userAuth ? (
              <button 
                onClick={handleLogout}
                className="block text-center w-full text-white border border-[#2a2a2a] bg-[#1a1a1a] hover:bg-[#222222] px-4 py-2 rounded-lg text-base font-medium"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="block text-center w-full text-white border border-[#2a2a2a] bg-[#1a1a1a] hover:bg-[#222222] px-4 py-2 rounded-lg text-base font-medium">
                  Login
                </Link>
                <Link to="/ask" className="block text-center w-full bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-lg text-base font-medium">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavbarMain;