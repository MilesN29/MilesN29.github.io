import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [focusedField, setFocusedField] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, message } = formData;

        if (!name.trim() || !email.trim() || !message.trim()) {
            alert('Please fill in all fields.');
            return;
        }

        const subject = encodeURIComponent(`Message from ${name}`);
        const body = encodeURIComponent(message);
        window.location.href = `mailto:drnewland8@gmail.com?subject=${subject}&body=${body}`;
    };

    const inputClasses = (fieldName) => `
        w-full px-4 py-3 rounded-xl 
        bg-[#1e1e1e] border border-white/10
        text-white placeholder-gray-500
        outline-none transition-all duration-300
        autofill:bg-[#1e1e1e] autofill:text-white
        [&:-webkit-autofill]:bg-[#1e1e1e]
        [&:-webkit-autofill]:[-webkit-text-fill-color:white]
        [&:-webkit-autofill]:[transition:background-color_5000s_ease-in-out_0s]
        ${focusedField === fieldName 
            ? 'border-yellow-500/50 bg-[#252525] shadow-lg shadow-yellow-500/10' 
            : 'hover:border-white/20'
        }
    `;

    const labelClasses = (fieldName) => `
        block text-sm font-medium mb-2 transition-colors duration-300
        ${focusedField === fieldName ? 'text-yellow-400' : 'text-gray-400'}
    `;

    return (
        <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
        >
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <label htmlFor="name" className={labelClasses('name')}>
                    Your Name
                </label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="John Doe"
                    className={inputClasses('name')}
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <label htmlFor="email" className={labelClasses('email')}>
                    Your Email
                </label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="john@example.com"
                    className={inputClasses('email')}
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <label htmlFor="message" className={labelClasses('message')}>
                    Message
                </label>
                <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    value={formData.message} 
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Write your message here..."
                    className={`${inputClasses('message')} resize-none`}
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
            >
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-medium rounded-xl shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-shadow flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Message
                </motion.button>
            </motion.div>
        </motion.form>
    );
};

export default ContactForm;
