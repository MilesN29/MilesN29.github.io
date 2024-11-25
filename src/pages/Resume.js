import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import pdfFile from '../assets/Resume Fall 2024.pdf';

const Resume = () => {
    return (
        <div className="resume-page">
            <Navbar />
            <header className="resume-header">
                <h1>My Resume</h1>
            </header>
            <section className="resume-section">
                {/* use iframe for more reliable resume loading */}
                <iframe
                    src={pdfFile}
                    width="100%"
                    height="1000px"
                    title="Resume PDF"
                />
            </section>
            <Footer />
        </div>
    );
};

export default Resume;
