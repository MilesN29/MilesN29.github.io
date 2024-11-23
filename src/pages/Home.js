import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/index.css';

const Home = () => {
    return (
        <>
            <Navbar />
            <header>
                <h1>Miles Newland</h1>
            </header>
            <section>
                <h2>Quick Intro</h2>
                <p>Hey there! 😄 I'm Miles Newland, a Computer Science student at the University of Pittsburgh...</p>
                {/* Add other content here */}
            </section>
            <Footer />
        </>
    );
};

export default Home;
