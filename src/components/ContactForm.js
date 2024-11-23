import React, { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

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
        window.location.href = `mailto:mdn29@pitt.edu?subject=${subject}&body=${body}`;
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Your Name:</label><br />
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} /><br />
            <label htmlFor="email">Your Email:</label><br />
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} /><br />
            <label htmlFor="message">Message:</label><br />
            <textarea id="message" name="message" rows="4" cols="50" value={formData.message} onChange={handleChange}></textarea><br /><br />
            <input type="submit" value="Send" />
        </form>
    );
};

export default ContactForm;
