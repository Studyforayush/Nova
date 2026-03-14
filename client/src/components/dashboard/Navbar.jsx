import React from 'react';

const Navbar = ({ title, toggleSidebar }) => {
  return (
    <header className="bg-[#000000] border-b border-[#2a2a2a] sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="mr-4 text-gray-400 hover:text-white focus:outline-none lg:hidden"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
        </div>

        <div className="flex items-center space-x-6">
          {/* Search Bar */}
          <div className="hidden md:block relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </span>
            <input type="text" className="w-full py-2 pl-10 pr-4 bg-[#111111] border border-[#2a2a2a] rounded-xl text-sm focus:outline-none focus:border-gray-500 text-white placeholder-gray-500 transition" placeholder="Search..." />
          </div>

          {/* Profile Dropdown (Static for UI) */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-sm font-semibold text-white overflow-hidden">
                <svg className="w-full h-full text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
