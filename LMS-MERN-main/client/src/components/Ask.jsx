import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavbarMain from "./NavbarMain";
import { useGlobalContext } from "../GlobalContext";
import { motion } from "framer-motion";

const Ask = () => {
    const navigate = useNavigate();
    const { userAuth, user } = useGlobalContext();

    useEffect(() => {
        if (userAuth && user) {
            if (user.role === 'student') navigate('/studentMain');
            else navigate('/teacherMain');
        }
    }, [userAuth, user, navigate]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-gray-200 font-sans relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full"></div>
            </div>

            <NavbarMain />
            
            <motion.div 
                className="max-w-5xl mx-auto px-4 py-16 md:py-24 flex flex-col items-center justify-center relative z-10"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div className="text-center mb-16" variants={itemVariants}>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                        Join Our Platform
                    </h1>
                    <p className="text-gray-400 text-xl max-w-xl mx-auto font-light leading-relaxed">
                        Whether you're here to master a new skill or share your expertise, we've got a place for you.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                    {/* Student Card */}
                    <motion.div variants={itemVariants} whileHover={{ y: -10 }} className="group">
                        <Link 
                            to="/studentRegister" 
                            className="block relative h-full bg-[#0f0f0f] border border-[#1f1f1f] rounded-3xl p-10 transition-all hover:border-blue-500/50 hover:bg-[#151515] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                </svg>
                            </div>
                            
                            <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/20 transition-transform group-hover:scale-110 group-hover:rotate-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">I want to learn</h2>
                            <p className="text-gray-400 text-lg font-light leading-relaxed">Join thousands of students and start your learning journey today.</p>
                            
                            <div className="mt-8 flex items-center text-blue-400 font-medium">
                                <span>Get Started</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Instructor Card */}
                    <motion.div variants={itemVariants} whileHover={{ y: -10 }} className="group">
                        <Link 
                            to="/teacherRegister" 
                            className="block relative h-full bg-[#0f0f0f] border border-[#1f1f1f] rounded-3xl p-10 transition-all hover:border-purple-500/50 hover:bg-[#151515] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>

                            <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-lg shadow-purple-500/20 transition-transform group-hover:scale-110 group-hover:-rotate-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">I want to teach</h2>
                            <p className="text-gray-400 text-lg font-light leading-relaxed">Share your expertise and empower learners around the globe.</p>
                            
                            <div className="mt-8 flex items-center text-purple-400 font-medium">
                                <span>Join Faculty</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </Link>
                    </motion.div>
                </div>

                <motion.div className="mt-16 text-center" variants={itemVariants}>
                    <Link to="/login" className="text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-2 group">
                        Already have an account? 
                        <span className="text-white font-medium group-hover:underline">Sign In</span>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Ask;