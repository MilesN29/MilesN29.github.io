import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

const Contact = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    const contactMethods = [
        {
            title: 'Email',
            value: 'drnewland8@gmail.com',
            href: 'mailto:drnewland8@gmail.com',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            title: 'LinkedIn',
            value: 'Connect with me',
            href: 'https://www.linkedin.com/in/miles-newland-34518a262/',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
            ),
        },
        {
            title: 'GitHub',
            value: 'View my projects',
            href: 'https://github.com/MilesN29',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
            ),
        },
    ];

    return (
        <div className="min-h-screen">
            <Navbar />
            
            <section className="pt-32 pb-32 px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-5xl mx-auto"
                >
                    {/* header */}
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                            Get in Touch
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Send me an email, connect on LinkedIn, or check out my GitHUb projects!
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-5 gap-12">
                        {/* contact methods */}
                        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
                            <h2 className="text-xl font-semibold text-white mb-6">
                                Contact Information
                            </h2>
                            {contactMethods.map((method, index) => (
                                <motion.a
                                    key={method.title}
                                    href={method.href}
                                    target={method.href.startsWith('mailto') ? '_self' : '_blank'}
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    whileHover={{ x: 8 }}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-yellow-500/30 hover:bg-white/10 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform">
                                        {method.icon}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">{method.title}</p>
                                        <p className="text-white font-medium">{method.value}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </motion.div>

                        {/* contact form */}
                        <motion.div variants={itemVariants} className="lg:col-span-3">
                            <div className="p-8 rounded-2xl bg-[rgba(30,30,30,0.8)] backdrop-blur-sm border border-white/5">
                                <h2 className="text-xl font-semibold text-white mb-6">
                                    Send a Message
                                </h2>
                                <ContactForm />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
