import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGlobalContext } from "../GlobalContext";
import Toast from "./Toast";
import NavbarMain from "./NavbarMain";
import { API_BASE } from '../api';
import { supabase } from '../config/supabaseClient';

const Login = () => {
    const navigate = useNavigate();
    const [toast, setToast] = useState(null);
    let {login, setLogin, userAuth, setUserAuth, user} = useGlobalContext()
  
    // Redirect if already authenticated
    useEffect(() => {
        if (userAuth && user) {
            const role = user.role;
            if (role === 'student') navigate('/studentMain');
            else if (role === 'faculty' || role === 'teacher') navigate('/teacherMain');
            else if (role === 'admin') navigate('/admin-dashboard');
        }
    }, [userAuth, user, navigate]);

    const [userLoginData, setUserLoginData] = useState({
      email: '',
      password: ''
    });

    let handleChange = (e) => {
      setUserLoginData({ ...userLoginData, [e.target.name]: e.target.value })
    }

    const showToast = (message, duration = 2000) => {
        setToast({ message });
        return new Promise((resolve) => {
          setTimeout(() => {
            setToast(null);
            resolve();
          }, 1000);
        });
      };
  
    let handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // Use backend login endpoint to support bypass and server-side logic
        const response = await axios.post(`${API_BASE}/api/auth/login`, {
            email: userLoginData.email,
            password: userLoginData.password
        });

        const { success, data, message } = response.data;

        if (!success) {
            showToast(message || "Login failed");
            return;
        }

        let role = data.user.user_metadata?.role || 'student';
        setLogin(true);

        if (role === 'student' || role === 'faculty' || role === 'teacher' || role === 'admin') {
            await showToast("Login Successful");
            localStorage.setItem('token', data.session.access_token);
            setUserAuth(true);
            setTimeout(() => {
                if (role === 'student') navigate('/studentMain');
                else if (role === 'faculty' || role === 'teacher') navigate('/teacherMain');
                else if (role === 'admin') navigate('/admin-dashboard');
            }, 500); // Redirect faster
        } else {
            showToast("Role not recognized!");
        }

     } catch (error) {
        console.error(error)
        showToast(error.response?.data?.message || "Something went wrong!");
     }
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col relative overflow-hidden selection:bg-blue-500/30">
            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
            </div>

            <NavbarMain />

            <div className="flex-1 flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-[#0f0f0f] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                >
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-black text-white mb-3 tracking-tight">
                            Welcome Back
                        </h1>
                        <p className="text-gray-400 font-light">
                            Enter your credentials to access your dashboard.
                        </p>
                        
                        <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl text-xs text-blue-300 leading-relaxed">
                            <span className="font-bold block mb-1">Developer Tip:</span>
                            Use any <strong className="text-blue-400">@test.com</strong> email with <strong className="text-blue-400">password123</strong> to bypass Supabase rate limits.
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                                Email Address
                            </label>
                            <input 
                                type="email" 
                                name="email"
                                value={userLoginData.email}
                                onChange={(e) => setUserLoginData({...userLoginData, email: e.target.value})}
                                className="w-full bg-[#151515] border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                placeholder="name@example.com"
                                required
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2 ml-1">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">
                                    Password
                                </label>
                                <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Forgot?</a>
                            </div>
                            <input 
                                type="password" 
                                name="password"
                                value={userLoginData.password}
                                onChange={(e) => setUserLoginData({...userLoginData, password: e.target.value})}
                                className="w-full bg-[#151515] border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit" 
                            className="w-full bg-white text-black font-bold py-4 rounded-2xl shadow-xl shadow-white/5 transition-all hover:bg-gray-100"
                        >
                            Sign In
                        </motion.button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5 text-center">
                        <p className="text-gray-500 text-sm">
                            Don't have an account?{" "}
                            <Link to="/ask" className="text-white font-bold hover:underline transition-all">Sign up</Link>
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Toast Notification */}
            {toast && (
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-white text-black font-bold rounded-full shadow-2xl z-50"
                >
                    {toast.message || toast}
                </motion.div>
            )}
        </div>
    )
}

export default Login