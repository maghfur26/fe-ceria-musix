import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import About from "../../Components/fragments/landing-pages/About";
import Details from "../../Components/fragments/landing-pages/Details";
import Footer from "../../Components/fragments/landing-pages/Footer";
import Hero from "../../Components/fragments/landing-pages/Hero";
import Navbar from "../../Components/fragments/landing-pages/Navbar";
import Search from "../../Components/fragments/landing-pages/Search";
import Team from "../../Components/fragments/landing-pages/Team";
import Contact from "../../Components/fragments/landing-pages/Contact";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash]);

  return (
    <div id="home">
      <Navbar />
      <Hero />
      <Search id="booking" />
      <About id="about" />
      <Details />
      <Contact id="contact"/>
      <Team id="team" />
      <Footer />
    </div>
  );
};

export default Home;
