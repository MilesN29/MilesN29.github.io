import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const Home = () => {
    return (
        <div className="home-page">
            <Navbar />
            <header className="home-header">
                <h1>Miles Newland</h1>
            </header>
            <section className="home-section">
                <p>Hi! I'm Miles</p>
                <p>Welcome to my website! I hope your doing well! 😄</p>
                <p>I'm an aspiring software engineer based in Pittsburgh PA.</p>
            </section>
            <Footer />
        </div>
    );
};

export default Home;
