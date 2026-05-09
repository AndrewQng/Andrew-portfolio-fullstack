import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import Hero from '../components/sections/Hero.jsx';
import AboutMe from '../components/sections/AboutMe.jsx';
import PortfolioShowcase from '../components/sections/PortfolioShowcase.jsx';
import SkillsOverview from '../components/sections/SkillsOverview.jsx';
import ExperienceTimeline from '../components/sections/ExperienceTimeline.jsx';
import ContactForm from '../components/sections/ContactForm.jsx';
import { getUserProfile } from '../services/userService.js';

const Home = () => {
    const [theme, setTheme] = useState(null);

    useEffect(() => {
        const fetchTheme = async () => {
            try {
                const data = await getUserProfile();
                if (data && data.theme) {
                    setTheme(data.theme);
                }
            } catch (error) {
                console.error("Lỗi lấy Theme trang chủ:", error);
            }
        };
        fetchTheme();
    }, []);

    const t = theme || {
        primaryColor: '#3b82f6',
        secondaryColor: '#9333ea',
        heroPrimary: '#3b82f6',
        heroSecondary: '#9333ea',
        aboutPrimary: '#10b981',
        aboutSecondary: '#3b82f6',
        projectsPrimary: '#f59e0b',
        projectsSecondary: '#ef4444',
        skillsPrimary: '#ec4899',
        skillsSecondary: '#8b5cf6',
        experiencePrimary: '#06b6d4',
        experienceSecondary: '#3b82f6'
    };

    return (
        <div className="relative z-10 font-sans" style={{ '--color-primary': t.primaryColor, '--color-secondary': t.secondaryColor }}>
            <Navbar />
            
            <main className="relative z-10">
                <div style={{ '--color-primary': t.heroPrimary || t.primaryColor, '--color-secondary': t.heroSecondary || t.secondaryColor }}>
                    <Hero />
                </div>
                <div style={{ '--color-primary': t.aboutPrimary || t.primaryColor, '--color-secondary': t.aboutSecondary || t.secondaryColor }}>
                    <AboutMe />
                </div>
                <div style={{ '--color-primary': t.projectsPrimary || t.primaryColor, '--color-secondary': t.projectsSecondary || t.secondaryColor }}>
                    <PortfolioShowcase />
                </div>
                <div style={{ '--color-primary': t.skillsPrimary || t.primaryColor, '--color-secondary': t.skillsSecondary || t.secondaryColor }}>
                    <SkillsOverview />
                </div>
                <div style={{ '--color-primary': t.experiencePrimary || t.primaryColor, '--color-secondary': t.experienceSecondary || t.secondaryColor }}>
                    <ExperienceTimeline />
                </div>
                <ContactForm />
            </main>

            <Footer />
        </div>
    );
};

export default Home;