
import { Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 py-16 px-4 md:px-8 text-gray-300">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Suviksan <span className="text-gradient">Technologies</span></h3>
            <p className="mb-6">
              Delivering innovative IT solutions and services to help businesses thrive in the digital era.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="hover:text-primary transition-colors flex items-center"><ArrowRight size={14} className="mr-2" /> About Us</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors flex items-center"><ArrowRight size={14} className="mr-2" /> Services</a></li>
              <li><a href="#portfolio" className="hover:text-primary transition-colors flex items-center"><ArrowRight size={14} className="mr-2" /> Portfolio</a></li>
              <li><a href="#careers" className="hover:text-primary transition-colors flex items-center"><ArrowRight size={14} className="mr-2" /> Careers</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors flex items-center"><ArrowRight size={14} className="mr-2" /> Contact</a></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Our Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-primary transition-colors flex items-center"><ArrowRight size={14} className="mr-2" /> Custom Software Development</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center"><ArrowRight size={14} className="mr-2" /> Web & Mobile Applications</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center"><ArrowRight size={14} className="mr-2" /> Cloud Services</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center"><ArrowRight size={14} className="mr-2" /> Cybersecurity</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center"><ArrowRight size={14} className="mr-2" /> IT Consulting</a></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Newsletter</h4>
            <p className="mb-4">Subscribe to our newsletter to receive updates on our services, latest news and special offers.</p>
            <div className="flex">
              <Input placeholder="Your email address" className="rounded-r-none focus-visible:ring-0" />
              <Button className="rounded-l-none bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>© {currentYear} Suviksan Technologies. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
