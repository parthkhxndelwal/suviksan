
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <a href="#" className="text-xl md:text-2xl font-bold">
            <span className="text-gradient">Suviksan</span> Technologies
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-gray-700 hover:text-primary transition-colors">About Us</a>
          <a href="#services" className="text-gray-700 hover:text-primary transition-colors">Services</a>
          <a href="#portfolio" className="text-gray-700 hover:text-primary transition-colors">Portfolio</a>
          <a href="#careers" className="text-gray-700 hover:text-primary transition-colors">Careers</a>
          <a href="#contact" className="text-gray-700 hover:text-primary transition-colors">Contact</a>
          <Button className="bg-white border border-black hover:opacity-90 text-black">
            Get Quote
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className="text-gray-700 hover:text-primary focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white shadow-lg animate-fade-in glass-card">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#about" className="text-gray-700 hover:text-primary py-2 transition-colors" onClick={toggleMenu}>About Us</a>
            <a href="#services" className="text-gray-700 hover:text-primary py-2 transition-colors" onClick={toggleMenu}>Services</a>
            <a href="#portfolio" className="text-gray-700 hover:text-primary py-2 transition-colors" onClick={toggleMenu}>Portfolio</a>
            <a href="#careers" className="text-gray-700 hover:text-primary py-2 transition-colors" onClick={toggleMenu}>Careers</a>
            <a href="#contact" className="text-gray-700 hover:text-primary py-2 transition-colors" onClick={toggleMenu}>Contact</a>
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
