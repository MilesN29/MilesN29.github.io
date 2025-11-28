import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SpotifyWidget from '../components/SpotifyWidget';

const Home = () => {
    // animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    const skills = [
        { name: 'PHP', color: 'from-cyan-400 to-blue-500' },
        { name: 'JS/TS', color: 'from-yellow-400 to-orange-500' },
        { name: 'Java', color: 'from-blue-400 to-green-500' },
        { name: 'Python', color: 'from-red-400 to-orange-500' },
        { name: 'Git', color: 'from-orange-400 to-red-500' },
        { name: 'SQL', color: 'from-purple-400 to-pink-500' },
        { name: 'GCP & AWS', color: 'from-pink-400 to-purple-500' },

    ];

    const quickLinks = [
        { 
            title: 'View Resume', 
            description: 'Check out my experience and skills',
            path: '/resume',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
        },
        { 
            title: 'Get in Touch', 
            description: "Let's connect and chat",
            path: '/contact',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
        },
        { 
            title: 'Play My Game', 
            description: 'Check out my Phaser.js game',
            path: '/game',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
    ];

    return (
        <div className="min-h-screen">
            <Navbar />
            
            {/* hero section */}
            <section className="min-h-screen flex items-center justify-center px-6 pt-20 pb-32">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto text-center"
                >

                    {/* main heading */}
                    <motion.h1 
                        variants={itemVariants}
                        className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                    >
                        <span className="text-white">Hi, I'm </span>
                        <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                            Miles Newland
                        </span>
                    </motion.h1>

                    {/* subtitle */}
                    <motion.p 
                        variants={itemVariants}
                        className="text-xl sm:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto"
                    >
                        Aspiring Software Engineer based in Pittsburgh, PA.
                        <br />
                        <span className="text-gray-500 text-sm">"Will Happening Happening Happened"</span>

                    </motion.p>

                    {/* cta buttons */}
                    <motion.div 
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link 
                                to="/contact" 
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-medium rounded-xl shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-shadow"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Get in Touch
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link 
                                to="/resume" 
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 text-white font-medium rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                View Resume
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* skills tags
                    <motion.div variants={itemVariants}>
                        <p className="text-sm text-gray-500 mb-4">Technologies I work with</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {skills.map((skill, index) => (
                                <motion.span
                                    key={skill.name}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    className={`px-4 py-2 rounded-lg bg-gradient-to-r ${skill.color} bg-opacity-10 text-sm font-medium text-white/90 border border-white/10 cursor-default`}
                                    style={{ 
                                        background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
                                    }}
                                >
                                    {skill.name}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div> */}

                    {/* spotify widget */}
                    <motion.div variants={itemVariants} className="mt-16">
                        <SpotifyWidget />
                    </motion.div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
