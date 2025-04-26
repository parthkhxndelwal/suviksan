import { useEffect, useRef, useState } from 'react';
import { Menu as MenuIcon } from 'lucide-react';
import { Button } from "./ui/button";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Menu from './Menu';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navContentRef = useRef<HTMLDivElement>(null);

  // Handle body scroll lock when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const navbar = navbarRef.current;
    const logo = logoRef.current;
    const navContent = navContentRef.current;
    
    if (!navbar || !logo || !navContent) return;

    // Hide the navbar logo and nav content initially
    gsap.set(logo, { opacity: 0 });
    gsap.set(navContent, { opacity: 0 });
    
    // Create a mutation observer to detect when loader is complete
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class' && 
            document.body.classList.contains('loader-complete')) {
          
          // Now the loader animation is complete and the logo is in position
          // Let's fade in our navbar logo
          gsap.to(logo, {
            opacity: 1,
            duration: 0.5
          });
          
          // And fade in the navbar content with a slight delay
          gsap.to(navContent, {
            opacity: 1,
            duration: 0.5,
            delay: 0.2
          });
          
          observer.disconnect();
        }
      });
    });
    
    // Start observing document body for the loader-complete class
    observer.observe(document.body, { attributes: true });

    // Set initial navbar state
    gsap.set(navbar, {
      margin: '0px',
      borderRadius: '10%',
      backgroundColor: 'transparent',
      boxShadow: 'none',
      backdropFilter: 'none',
      paddingLeft: '1%',
      paddingRight: '1%',
    });

    // Scroll animation for navbar
    ScrollTrigger.create({
      trigger: 'body',
      scrub: 2,
      start: 'top+=1%',
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

    return () => {
      ScrollTrigger.killAll();
      observer.disconnect();
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <>
      <nav
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      >
        <div className="container mx-auto flex justify-between items-center py-5">
          {/* Logo with the navbar-logo class for targeting by the loader */}
          <a 
            ref={logoRef}
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xl md:text-2xl font-bold pl-[5%] navbar-logo"
          >
            <span className="text-gradient">Suviksan</span> Technologies
          </a>

          {/* Navigation content that fades in separately */}
          <div 
            ref={navContentRef}
            className="flex items-center space-x-8 pr-[5%]"
          >
            <div className="hidden md:block">
              <Button className="bg-white border border-black hover:opacity-90 text-black">
                Get Quote
              </Button>
            </div>
            
            {/* Menu Toggle Button */}
            <button 
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary focus:outline-none p-2 flex items-center"
              aria-label="Toggle menu"
            >
              <MenuIcon size={24} />
              <span className="ml-2 text-sm">Menu</span>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Fullscreen Menu Component */}
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Navbar;