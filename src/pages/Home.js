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
                <h1>Doing some fixes, be back up shortly</h1>
            </section>
            <Footer />
        </>
    );
};

export default Home;
