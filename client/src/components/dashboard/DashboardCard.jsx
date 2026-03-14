import React from 'react';

const DashboardCard = ({ title, value }) => {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 shadow-md transition duration-200 hover:scale-[1.02] flex flex-col justify-between h-full">
      <h3 className="text-gray-400 text-sm font-medium tracking-wide uppercase mb-4">{title}</h3>
      <p className="text-2xl font-semibold text-white tracking-tight">{value}</p>
    </div>
  );
};

export default DashboardCard;
