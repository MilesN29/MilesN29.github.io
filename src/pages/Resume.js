import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import pdfFile from '../assets/Resume Spring 2025.pdf';

const Resume = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            
            <section className="pt-32 pb-32 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-5xl mx-auto"
                >
                    {/* header */}
                    <div className="text-center mb-8">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl sm:text-5xl font-bold text-white mb-4"
                        >
                            My Resume
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-lg text-gray-400 max-w-2xl mx-auto"
                        >
                            Here's a summary of my experience, education, and skills.
                        </motion.p>
                    </div>

                    {/* pdf viewer */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="rounded-2xl overflow-hidden bg-[rgba(30,30,30,0.8)] backdrop-blur-sm border border-white/5 shadow-2xl"
                    >
                        <iframe
                            src={pdfFile}
                            className="w-full bg-white"
                            style={{ height: '85vh', minHeight: '600px' }}
                            title="Resume PDF"
                        />
                    </motion.div>

                    {/* download button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-center mt-8"
                    >
                        <motion.a
                            href={pdfFile}
                            download="Miles_Newland_Resume.pdf"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-medium rounded-xl shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-shadow"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download PDF
                        </motion.a>
                    </motion.div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default Resume;
