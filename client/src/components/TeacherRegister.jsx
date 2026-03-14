import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import NavbarMain from './NavbarMain';
import { API_BASE } from '../api';

function TeacherRegister() {
    const navigate = useNavigate();
    const [toast, setToast] = useState(null);

    const [teacher, setTeacher] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        address: '',
        password: '',
        password2: '',
        description: '',
    });

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    let handleChange = (e) => {
        setTeacher({ ...teacher, [e.target.name]: e.target.value })
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        
        if (teacher.password !== teacher.password2) {
            showToast("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE}/api/auth/register`, {
                email: teacher.email,
                password: teacher.password,
                role: 'faculty',
                name: teacher.name
            });

            const { success, data, message } = response.data;

            if (!success) {
                showToast(message || "Registration failed");
                return;
            }

            let mongoResponse = await axios.post(`${API_BASE}/api/teacher/teacherRegister`, {
                ...teacher,
                faculty_id: data.user.id
            });

            if (mongoResponse.status === 200) {
                showToast("Registered Successfully");
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            } else {
                showToast("Something went wrong!");
            }
        } catch (error) {
            console.error(error);
            showToast(error.response?.data?.message || "Something went wrong!");
        }
    };

    const inputClasses = "w-full bg-[#151515] border border-white/5 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-gray-600";
    const labelClasses = "block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1";

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col relative overflow-hidden selection:bg-purple-500/30">
            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full"></div>
            </div>

            <NavbarMain />

            <div className="flex-1 flex items-center justify-center p-6 md:py-12">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-3xl bg-[#0f0f0f] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400"></div>

                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                            Become an Instructor
                        </h1>
                        <p className="text-gray-400 font-light text-lg">
                            Share your knowledge with a global audience.
                        </p>
                        
                        <div className="mt-6 p-4 bg-purple-500/5 border border-purple-500/10 rounded-2xl text-xs text-purple-300 inline-block">
                            Tip: Use any <strong className="text-purple-400">@test.com</strong> email for instant access.
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className={labelClasses}>Full Name</label>
                            <input type="text" name="name" value={teacher.name} onChange={handleChange} className={inputClasses} placeholder="Dr. Sarah Wilson" required />
                        </div>

                        <div>
                            <label className={labelClasses}>Professional Email</label>
                            <input type="email" name="email" value={teacher.email} onChange={handleChange} className={inputClasses} placeholder="sarah@test.com" required />
                        </div>

                        <div>
                            <label className={labelClasses}>Contact Number</label>
                            <input type="text" name="mobileNumber" value={teacher.mobileNumber} onChange={handleChange} className={inputClasses} placeholder="+1 234 567 890" required />
                        </div>

                        <div className="md:col-span-2">
                            <label className={labelClasses}>Location / Address</label>
                            <input type="text" name="address" value={teacher.address} onChange={handleChange} className={inputClasses} placeholder="Oxford University, UK" required />
                        </div>

                        <div className="md:col-span-2">
                            <label className={labelClasses}>Bio / Professional Description</label>
                            <textarea name="description" value={teacher.description} onChange={handleChange} className={`${inputClasses} min-h-[120px] resize-none`} placeholder="Tell us about your expertise and teaching experience..." required />
                        </div>

                        <div>
                            <label className={labelClasses}>Password</label>
                            <input type="password" name="password" value={teacher.password} onChange={handleChange} className={inputClasses} placeholder="••••••••" required />
                        </div>

                        <div>
                            <label className={labelClasses}>Confirm Password</label>
                            <input type="password" name="password2" value={teacher.password2} onChange={handleChange} className={inputClasses} placeholder="••••••••" required />
                        </div>

                        <div className="md:col-span-2 pt-4">
                            <motion.button 
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit" 
                                className="w-full bg-white text-black font-black py-4 rounded-2xl shadow-xl shadow-white/5 transition-all hover:bg-gray-100 text-lg"
                            >
                                Register as Instructor
                            </motion.button>
                        </div>
                    </form>

                    <div className="mt-10 pt-8 border-t border-white/5 text-center">
                        <p className="text-gray-500">
                            Already part of our faculty?{" "}
                            <Link to="/login" className="text-white font-bold hover:underline">Sign in</Link>
                        </p>
                    </div>
                </motion.div>
            </div>

            <AnimatePresence>
                {toast && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 px-8 py-4 bg-white text-black font-black rounded-full shadow-[0_20px_50px_rgba(255,255,255,0.2)] z-50"
                    >
                        {toast.message || toast}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default TeacherRegister;