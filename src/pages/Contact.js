import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';


const Contact = () => {
    return (
        <div className="contact-page">
            <Navbar />
            <header className='contact-header'>
                <h1>Contact Me</h1>
            </header>
            <section className='contact-section'>
                <ContactForm />
            </section>
            <Footer />
        </div>
    );
};

export default Contact;
