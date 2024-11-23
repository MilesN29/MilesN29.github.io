import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import '../styles/index.css';
import pdfFile from '../assets/Resume Fall 2024.pdf';

const Contact = () => {
    return (
        <>
            <Navbar />
            <header>
                <h1>Contact Me</h1>
            </header>
            <section>
                <ContactForm />
                <embed
                    src={pdfFile}
                    type="application/pdf"
                    width="100%"
                    height="1000px"
                />
            </section>
            <Footer />
        </>
    );
};

export default Contact;
