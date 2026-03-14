import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DashboardLayout = ({ title, children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-[#000000] text-white font-sans overflow-hidden selection:bg-[#2a2a2a] selection:text-white">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-col flex-1 w-full relative">
        <Navbar title={title} toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto bg-[#000000] p-6 lg:p-10">
          <div className="max-w-7xl mx-auto space-y-8 pb-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
