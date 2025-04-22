
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="hero" className="pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-6 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-blue-50 rounded-full text-primary font-medium mb-2">
              Your Digital Transformation Partner
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Innovative <span className="text-gradient">IT Solutions</span> for Modern Business
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-xl">
              Empowering businesses with cutting-edge technology services, custom software development, and strategic IT consulting.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div id="overlay"></div>
              <Button className="px-6 py-3 rounded-lg bg-fancy-gradient-1 text-white font-medium hover:shadow-lg transition-all flex items-center justify-center">
                Explore Services
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button variant="outline" className="px-6 py-3 hover:text-black hover:bg-fancy-gradient-2 rounded-lg border hover:border hover:border-black text-gray-700 font-medium  transition-all flex items-center justify-center">
                Contact Us
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 animate-float">
            <div className="relative">
              {/* Main illustration */}
              <img 
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80" 
                alt="IT Solutions" 
                className="w-full h-auto rounded-xl shadow-2xl"
              />
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent rounded-lg -z-10"></div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-50 rounded-lg -z-10"></div>
              
              {/* Stats */}
              <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 glass-card rounded-lg p-4 flex gap-8 w-4/5">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gradient">10+</p>
                  <p className="text-xs text-gray-500">Years of Experience</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gradient">200+</p>
                  <p className="text-xs text-gray-500">Projects Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gradient">50+</p>
                  <p className="text-xs text-gray-500">IT Professionals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/3 left-0 w-64 h-64 bg-blue-50 rounded-full filter blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-50 rounded-full filter blur-3xl opacity-30 -z-10"></div>
    </section>
  );
};

export default HeroSection;
