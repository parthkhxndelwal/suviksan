import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import CareersSection from "@/components/CareersSection";
import ContactSection from "@/components/ContactSection";
import PartnerLogos from "@/components/IntegrationLogos";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import gsap from "gsap";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const mainContentRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // Prevent scrolling during loading
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  useEffect(() => {
    const mainContent = mainContentRef.current;
    if (!mainContent) return;
    
    // Initially hide the main content
    gsap.set(mainContent, { opacity: 0 });
    
    // Create a mutation observer to detect when loader is complete
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class' && 
            document.body.classList.contains('loader-complete')) {
          
          // Fade in the main content after loader is complete
          gsap.to(mainContent, {
            opacity: 1,
            duration: 0.8,
            delay: 0.2,
            ease: "power2.inOut"
          });
          
          observer.disconnect();
        }
      });
    });
    
    // Start observing document body for the loader-complete class
    observer.observe(document.body, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle loader completion
  const handleLoaderComplete = () => {
    // We don't immediately remove the loader component,
    // that will be handled by the animations and opacity transitions
    setLoading(false);
  };

  return (
    <>
      {/* Loader stays active until animation is complete */}
      {loading && <Loader onComplete={handleLoaderComplete} />}
      
      <div className="min-h-screen flex flex-col">
        {/* Navbar is always rendered to provide position reference for loader */}
        <Navbar />
        
        {/* Main content fades in after loader animation */}
        <main ref={mainContentRef}>
          <HeroSection />
          <PartnerLogos />
          <AboutSection />
          <ServicesSection />
          <PortfolioSection />
          <TestimonialsSection />
          <CareersSection />
          <FaqSection />
          <ContactSection />
          <CallToAction />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;