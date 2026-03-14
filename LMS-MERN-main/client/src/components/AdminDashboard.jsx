import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../api';
import DashboardLayout from './dashboard/DashboardLayout';
import DashboardCard from './dashboard/DashboardCard';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ students: 0, faculty: 0, courses: 0, aiInsights: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const studentRes = await axios.get(`${API_BASE}/api/student/studentRegister`); 
        const facultyRes = await axios.get(`${API_BASE}/api/teacher/teacherRegister`); 
        const coursesRes = await axios.get(`${API_BASE}/api/courses/getAllCourses`); 
        
        setStats({
          students: Array.isArray(studentRes.data) ? studentRes.data.length : 0,
          faculty: Array.isArray(facultyRes.data) ? facultyRes.data.length : 0,
          courses: Array.isArray(coursesRes.data) ? coursesRes.data.length : 0,
          aiInsights: "Platform growth is steady. Recommended action: Add more high-demand technical courses to increase student engagement by 25%."
        });
      } catch (error) {
        console.error("Error fetching stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <DashboardLayout title="Admin Command Center">
      {/* Quick Actions Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Overview</h2>
          <p className="text-gray-500">Manage your platform's growth and content.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/courseForm')}
          className="bg-white text-black px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-xl shadow-white/5"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path>
          </svg>
          Add New Course
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <DashboardCard title="Total Students" value={stats.students} />
        <DashboardCard title="Total Instructors" value={stats.faculty} />
        <DashboardCard title="Active Courses" value={stats.courses} />
      </div>

      {/* Insights Section */}
      <div className="bg-[#0f0f0f] p-8 md:p-10 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[60%] bg-blue-600/10 blur-[100px] rounded-full"></div>
        
        <h2 className="text-xs font-black tracking-[0.2em] text-blue-500 uppercase mb-8 flex items-center">
            <span className="w-8 h-px bg-blue-500/30 mr-4"></span>
            Platform Intelligence
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="p-8 bg-white/5 border border-white/5 rounded-3xl relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center shadow-xl">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>
                </div>
                <p className="text-white text-xl font-medium leading-relaxed italic">
                "{stats.aiInsights}"
                </p>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                    </div>
                    <div>
                        <h4 className="text-white font-bold">Revenue Growth</h4>
                        <p className="text-gray-500 text-sm">Up 14% from last month</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 transition-colors group-hover:bg-purple-500 group-hover:text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                    </div>
                    <div>
                        <h4 className="text-white font-bold">Course Engagement</h4>
                        <p className="text-gray-500 text-sm">Average 4.8/5 rating</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
