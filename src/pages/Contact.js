import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import '../styles/contact.css';

const Contact = () => {
    return (
        <>
            <Navbar />
            <header>
                <h1>Contact Me</h1>
            </header>
            <section>
                <ContactForm />
            </section>
            <Footer />
        </>
    );
};

export default Contact;
