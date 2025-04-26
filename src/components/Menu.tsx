import { useRef, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu = ({ isOpen, onClose }: MenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLUListElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    // Set a reference to the main page content
    pageRef.current = document.getElementById('main-content') as HTMLDivElement;
    if (!pageRef.current) {
      // If the main-content element doesn't exist, grab the body instead
      pageRef.current = document.body as HTMLDivElement;
    }

    const tl = gsap.timeline({ paused: true });
    if (menuRef.current && overlayRef.current && menuItemsRef.current && closeButtonRef.current && pageRef.current) {
      // Initial state (only set once)
      if (!hasInitialized) {
        gsap.set(overlayRef.current, { opacity: 0 });
        gsap.set(menuRef.current, { 
          xPercent: 100,
          opacity: 0
        });
        gsap.set(menuItemsRef.current.children, { 
          x: 50, 
          opacity: 0 
        });
        gsap.set(closeButtonRef.current, { 
          opacity: 0,
          scale: 0
        });
        setHasInitialized(true);
      }
      
      // Animation timeline for opening
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.2
      })
      .to(pageRef.current, {
        x: "-15vw", // Shift page to the left
        duration: 0.4,
        ease: "power3.inOut"
      }, "-=0.1")
      .to(menuRef.current, { 
        xPercent: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power3.inOut"
      }, "-=0.4") // Start at the same time as page shift
      .to(closeButtonRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.5)"
      }, "-=0.2")
      .to(menuItemsRef.current.children, {
        x: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.1");
      
      // Only play animations if we've initialized first
      // This prevents the closing animation on first render
      if (hasInitialized) {
        if (isOpen) {
          tl.play();
          // Add overflow hidden to body when menu is open
          document.body.style.overflow = 'hidden';
        } else {
          tl.reverse();
          // Remove overflow hidden when menu is closed
          document.body.style.overflow = '';
        }
      }
    }

    return () => {
      tl.kill();
    };
  }, [isOpen, hasInitialized]);

  const handleMenuItemClick = (sectionId: string) => {
    onClose();
    const element = document.getElementById(sectionId);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 500); // Increased delay to allow menu to close fully
    }
  };

  // Function to handle closing the menu
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    onClose();
  };

  return (
    <div className={`fixed inset-0 w-full h-full z-50 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Menu Content */}
      <div 
        ref={menuRef}
        className="fixed top-0 right-0 w-[30vw] h-full bg-white bg-opacity-95 backdrop-blur-md flex items-center justify-center shadow-xl"
        style={{ minWidth: "320px" }} // Ensure it's not too narrow on smaller screens
      >
        {/* Close Button - Fixed the onClick event */}
        <button 
          ref={closeButtonRef}
          className="absolute top-8 right-8 text-black hover:text-gray-600 transition-colors focus:outline-none p-2"
          onClick={handleClose}
        >
          <X size={32} />
        </button>
        
        {/* Menu Items */}
        <ul ref={menuItemsRef} className="flex flex-col items-start list-none space-y-12 px-12 w-full">
          <li className="w-full">
            <a 
              href="#about" 
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick('about');
              }}
              className="text-3xl md:text-4xl font-bold text-black hover:text-gray-700 transition-colors relative group cursor-pointer flex justify-between w-full"
            >
              About <span className="transition-transform group-hover:translate-x-2">→</span>
            </a>
          </li>
          <li className="w-full">
            <a 
              href="#careers" 
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick('careers');
              }}
              className="text-3xl md:text-4xl font-bold text-black hover:text-gray-700 transition-colors relative group cursor-pointer flex justify-between w-full"
            >
              Career <span className="transition-transform group-hover:translate-x-2">→</span>
            </a>
          </li>
          <li className="w-full">
            <a 
              href="#portfolio" 
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick('portfolio');
              }}
              className="text-3xl md:text-4xl font-bold text-black hover:text-gray-700 transition-colors relative group cursor-pointer flex justify-between w-full"
            >
              Gallery <span className="transition-transform group-hover:translate-x-2">→</span>
            </a>
          </li>
          <li className="w-full">
            <a 
              href="#services" 
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick('services');
              }}
              className="text-3xl md:text-4xl font-bold text-black hover:text-gray-700 transition-colors relative group cursor-pointer flex justify-between w-full"
            >
              Services <span className="transition-transform group-hover:translate-x-2">→</span>
            </a>
          </li>
          <li className="w-full">
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick('contact');
              }}
              className="text-3xl md:text-4xl font-bold text-black hover:text-gray-700 transition-colors relative group cursor-pointer flex justify-between w-full"
            >
              Contact Us <span className="transition-transform group-hover:translate-x-2">→</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;