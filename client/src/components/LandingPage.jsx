import { useNavigate } from 'react-router-dom'
import { BouncyCardsFeatures } from './AboutUs'
import NavbarMain from './NavbarMain'
import { motion } from "framer-motion";
import { useGlobalContext } from '../GlobalContext';



const LandingPage = () => {
    let navigate = useNavigate()
    const { userAuth, user } = useGlobalContext();

    const handleClick = () => {
        if (userAuth && user) {
            if (user.role === 'student') navigate('/studentMain');
            else navigate('/teacherMain');
        } else {
            navigate('/ask')
        }
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
            <NavbarMain />
            
            {/* Hero Section */}
            <main className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-blue-400 uppercase bg-blue-400/10 border border-blue-400/20 rounded-full">
                            The Future of Learning is Here
                        </span>
                        <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tight leading-[1.1]">
                            Master Any Skill <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                                Empower Your Future
                            </span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12 font-light leading-relaxed">
                            Join a global community of learners and educators. Access world-class courses, 
                            track your progress, and achieve your goals with our intuitive platform.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full sm:w-auto px-10 py-5 bg-white text-black text-lg font-bold rounded-2xl transition-all hover:bg-gray-100"
                            onClick={handleClick}
                        >
                            Get Started for Free
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white/10 text-white text-lg font-bold rounded-2xl transition-all"
                            onClick={() => navigate('/about')}
                        >
                            View All Courses
                        </motion.button>
                    </motion.div>

                    {/* Stats or Trusted by section */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="mt-24 pt-16 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8"
                    >
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">10k+</div>
                            <div className="text-gray-500 text-sm uppercase tracking-widest">Active Students</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">500+</div>
                            <div className="text-gray-500 text-sm uppercase tracking-widest">Expert Tutors</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">2k+</div>
                            <div className="text-gray-500 text-sm uppercase tracking-widest">Premium Courses</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">99%</div>
                            <div className="text-gray-500 text-sm uppercase tracking-widest">Success Rate</div>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Features Section */}
            <div className="bg-[#080808] py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything you need to succeed</h2>
                        <p className="text-gray-500 text-lg">Powerful features to help you learn and grow.</p>
                    </div>
                    <BouncyCardsFeatures />
                </div>
            </div>

            {/* Footer Placeholder */}
            <footer className="py-12 border-t border-white/5 text-center text-gray-600 text-sm">
                <p>&copy; 2024 E-Learning Platform. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default LandingPage;