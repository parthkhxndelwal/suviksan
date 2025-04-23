import { useRef, useEffect } from 'react';
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

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    
    if (menuRef.current && overlayRef.current && menuItemsRef.current) {
      // Initial state
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(menuRef.current, { 
        clipPath: 'circle(0% at top right)',
        opacity: 0
      });
      gsap.set(menuItemsRef.current.children, { 
        y: 50, 
        opacity: 0 
      });
      gsap.set(closeButtonRef.current, { 
        opacity: 0,
        scale: 0
      });
      
      // Animation timeline
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3
      })
      .to(menuRef.current, { 
        clipPath: 'circle(150% at top right)',
        opacity: 1,
        duration: 0.6,
        ease: "power3.inOut"
      }, "-=0.1")
      .to(closeButtonRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.5)"
      }, "-=0.2")
      .to(menuItemsRef.current.children, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.1");
      
      if (isOpen) {
        tl.play();
      } else {
        tl.reverse();
      }
    }

    return () => {
      tl.kill();
    };
  }, [isOpen]);

  const handleMenuItemClick = (sectionId: string) => {
    onClose();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Menu Content */}
      <div 
        ref={menuRef}
        className="fixed inset-0 bg-white bg-opacity-95 backdrop-blur-md flex items-center justify-center"
      >
        {/* Close Button */}
        <button 
          ref={closeButtonRef}
          className="absolute top-8 right-8 text-black hover:text-gray-600 transition-colors focus:outline-none"
          onClick={onClose}
        >
          <X size={32} />
        </button>
        
        {/* Menu Items */}
        <ul ref={menuItemsRef} className="flex flex-col items-center space-y-8">
          <li>
            <a 
              href="#about" 
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick('about');
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black hover:text-gray-700 transition-colors relative group cursor-pointer"
            >
              About <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
            </a>
          </li>
          <li>
            <a 
              href="#careers" 
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick('careers');
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black hover:text-gray-700 transition-colors relative group cursor-pointer"
            >
              Career <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
            </a>
          </li>
          <li>
            <a 
              href="#portfolio" 
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick('portfolio');
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black hover:text-gray-700 transition-colors relative group cursor-pointer"
            >
              Gallery <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
            </a>
          </li>
          <li>
            <a 
              href="#services" 
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick('services');
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black hover:text-gray-700 transition-colors relative group cursor-pointer"
            >
              Services <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick('contact');
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black hover:text-gray-700 transition-colors relative group cursor-pointer"
            >
              Contact Us <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;