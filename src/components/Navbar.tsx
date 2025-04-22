'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    // Set initial state
    gsap.set(navbar, {
      margin: '0px',
      borderRadius: '10%',
      backgroundColor: 'transparent',
      boxShadow: 'none',
      backdropFilter: 'none',
      paddingLeft: '1%',
      paddingRight: '1%',
    });

    ScrollTrigger.create({
      trigger: 'body',
      scrub:2,
      start: 'top+=1%', // Adjust this threshold if needed
      onEnter: () => {
        gsap.to(navbar, {
          margin: '20px',
          borderRadius: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.69)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(4px)',
          duration: 0.5,
          ease: 'power2.out',
        });
      },
      onLeaveBack: () => {
        gsap.to(navbar, {
          margin: '0px',
          padding: '0px',
          borderRadius: '0px',
          backgroundColor: 'transparent',
          boxShadow: 'none',
          backdropFilter: 'none',
          duration: 0.5,
          ease: 'power2.inOut',
        });
      }
    });

    return () => ScrollTrigger.killAll();
  }, []);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <nav
      ref={navbarRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="container mx-auto flex justify-between items-center py-5">
        {/* Logo */}
        <a href="#" className="text-xl md:text-2xl font-bold pl-[5%]">
          <span className="text-gradient">Suviksan</span> Technologies
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 pr-[5%]">
          <a href="#about" className="text-gray-700 hover:text-primary transition-colors">About Us</a>
          <a href="#services" className="text-gray-700 hover:text-primary transition-colors">Services</a>
          <a href="#portfolio" className="text-gray-700 hover:text-primary transition-colors">Portfolio</a>
          <a href="#careers" className="text-gray-700 hover:text-primary transition-colors">Careers</a>
          <a href="#contact" className="text-gray-700 hover:text-primary transition-colors">Contact</a>
          <Button className="bg-white border border-black hover:opacity-90 text-black">
            Get Quote
          </Button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden pr-4">
          <button 
            onClick={toggleMenu}
            className="text-gray-700 hover:text-primary focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white shadow-lg animate-fade-in glass-card">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#about" className="text-gray-700 hover:text-primary py-2" onClick={toggleMenu}>About Us</a>
            <a href="#services" className="text-gray-700 hover:text-primary py-2" onClick={toggleMenu}>Services</a>
            <a href="#portfolio" className="text-gray-700 hover:text-primary py-2" onClick={toggleMenu}>Portfolio</a>
            <a href="#careers" className="text-gray-700 hover:text-primary py-2" onClick={toggleMenu}>Careers</a>
            <a href="#contact" className="text-gray-700 hover:text-primary py-2" onClick={toggleMenu}>Contact</a>
            <Button className="bg-fancy-gradient hover:opacity-90 text-white">
              Get Quote
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
