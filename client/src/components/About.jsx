import React from 'react';
import NavbarMain from './NavbarMain';
import { BouncyCardsFeatures } from './AboutUs';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <NavbarMain />
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-20"
            >
                <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
                        Empowering the <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            Next Generation
                        </span>
                    </h1>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto font-light leading-relaxed">
                        We are more than just an e-learning platform. We are a community 
                        dedicated to making world-class education accessible to everyone, everywhere.
                    </p>
                </div>
                
                <BouncyCardsFeatures />

                <div className="max-w-7xl mx-auto px-4 py-24 border-t border-white/5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                To provide a seamless, interactive, and high-quality learning environment 
                                that bridges the gap between expert instructors and passionate students.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                    <span className="text-gray-300">Accessibility for all learners</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                                    <span className="text-gray-300">Expert-led industry content</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
                                    <span className="text-gray-300">Community-driven growth</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl border border-white/5 flex items-center justify-center p-12">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            <footer className="py-12 border-t border-white/5 text-center text-gray-600 text-sm">
                <p>&copy; 2024 E-Learning Platform. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default About;
