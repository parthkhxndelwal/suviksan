
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80" 
                alt="Team working together" 
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-2xl -z-10"></div>
              
              <div className="absolute top-1/2 -right-12 transform -translate-y-1/2">
                <div className="glass-card p-6 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                    <p className="font-semibold">Innovation-Driven</p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-secondary rounded-full"></div>
                    <p className="font-semibold">Client-Focused</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <p className="font-semibold">Result-Oriented</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-block px-4 py-1 bg-blue-50 rounded-full text-primary font-medium">
              About Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Empowering Business Through <span className="text-gradient">Technology</span>
            </h2>
            
            <p className="text-gray-600">
              Suviksan Technologies is a premier IT services company with over 10 years of experience in delivering innovative technology solutions to businesses worldwide. We specialize in custom software development, cloud migration, digital transformation, and IT consulting.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <Check className="text-primary mt-1 min-w-[20px]" size={20} />
                <p>Enterprise Software Development</p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="text-primary mt-1 min-w-[20px]" size={20} />
                <p>Cloud Infrastructure Management</p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="text-primary mt-1 min-w-[20px]" size={20} />
                <p>Digital Transformation Strategy</p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="text-primary mt-1 min-w-[20px]" size={20} />
                <p>IT Security & Compliance</p>
              </div>
            </div>
            
            <Button className="bg-gradient-to-r from-primary to-secondary text-white">
              Learn More About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
