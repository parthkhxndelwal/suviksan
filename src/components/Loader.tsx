import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const logoTextRef = useRef(null);
  const loaderContainerRef = useRef(null);
  
  useEffect(() => {
    const loader = loaderRef.current;
    const logoText = logoTextRef.current;
    const loaderContainer = loaderContainerRef.current;
    
    if (!loader || !logoText || !loaderContainer) return;
    
    // Calculate position for text to end up at (matching navbar position)
    const calculateNavbarLogoPosition = () => {
      const navbarLogo = document.querySelector('.navbar-logo');
      if (!navbarLogo) {
        console.error('Navbar logo not found for the animation');
        return { x: 0, y: 0, scale: 1 };
      }
      
      const rect = navbarLogo.getBoundingClientRect();
      const logoRect = logoText.getBoundingClientRect();
      
      return {
        x: rect.left - logoRect.left,
        y: rect.top - logoRect.top,
        scale: rect.height / logoRect.height
      };
    };
    
    // Define the animation timeline
    const tl = gsap.timeline();
    
    // Initial state setup
    gsap.set(loader, { 
      backgroundColor: '#ffffff',
      opacity: 1
    });
    
    gsap.set(logoText, {
      opacity: 0,
      scale: 0.8,
      y: 0
    });
    
    // Phase 1: Fade in and scale up logo text
    tl.to(logoText, {
      opacity: 1,
      scale: 1.2,
      duration: 1.2,
      ease: "power3.out"
    })
    .addLabel("logoVisible")
    .to(logoText, {
      duration: 0.5, // Small pause before transitioning
      ease: "none"
    })
    
    // Phase 2: Move the logo text to navbar position
    .to(logoText, {
      duration: 1.2,
      x: () => calculateNavbarLogoPosition().x - 140,
      y: () => calculateNavbarLogoPosition().y - 12,
      scale: () => calculateNavbarLogoPosition().scale - 0.05,
      ease: "power2.inOut"
    })
    
    // Phase 3: Simultaneously, slide up the loader background
    .to(loaderContainer, {
      height: 0,
      ease: "power2.inOut",
      duration: 1.2
    }, "-=1.2")
    
    // IMPORTANT CHANGE: We now pause briefly AFTER the text is in position
    .to({}, { duration: 0.3 }) // A small pause
    
    // Phase 4: Only NOW do we fade out the loader
    .to(loader, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.01,
      ease: "power2.inOut",
      onComplete: () => {
        // Now we notify that the loader is complete
        document.body.classList.add('loader-complete');
        // And trigger the callback
        onComplete();
      }
    });
    
    return () => {
      tl.kill();
    };
  }, [onComplete]);
  
  return (
    <div 
      ref={loaderRef} 
      className="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden"
    >
      <div ref={loaderContainerRef} className="w-full h-full flex items-center justify-center">
        <div ref={logoTextRef} className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold whitespace-nowrap">
            <span className="text-gradient">Suviksan</span> Technologies
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Loader;