import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import Hero from '../components/sections/Hero.jsx';
import PortfolioShowcase from '../components/sections/PortfolioShowcase.jsx';
import SkillsOverview from '../components/sections/SkillsOverview.jsx';
import ExperienceTimeline from '../components/sections/ExperienceTimeline.jsx';
import ContactForm from '../components/sections/ContactForm.jsx';

const Home = () => {
    return (
        <div className="bg-gray-900 min-h-screen text-gray-100 font-sans">
            <Navbar />
            
            <main>
                <Hero />
                <PortfolioShowcase />
                <SkillsOverview />
                <ExperienceTimeline />
                <ContactForm />
            </main>

            <Footer />
        </div>
    );
};

export default Home;