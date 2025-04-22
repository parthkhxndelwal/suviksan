
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const CareersSection = () => {
  const openPositions = [
    {
      title: "Senior Full-Stack Developer",
      location: "New York, USA",
      type: "Full-time"
    },
    {
      title: "Cloud Solutions Architect",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "UI/UX Designer",
      location: "San Francisco, USA",
      type: "Full-time"
    },
    {
      title: "DevOps Engineer",
      location: "London, UK",
      type: "Full-time"
    }
  ];

  return (
    <section id="careers" className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-block px-4 py-1 bg-blue-50 rounded-full text-primary font-medium">
              Careers
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Join Our <span className="text-gradient">Team</span> of Innovators
            </h2>
            
            <p className="text-gray-600">
              We're looking for passionate technology enthusiasts to join our growing team. At Suviksan Technologies, you'll work with cutting-edge technologies and collaborate with talented professionals in a dynamic environment.
            </p>
            
            <div className="space-y-4">
              {openPositions.map((position, index) => (
                <div key={index} className="flex justify-between items-center p-4 glass-card rounded-lg card-hover">
                  <div>
                    <h3 className="font-semibold">{position.title}</h3>
                    <div className="flex text-sm text-gray-500 gap-4 mt-1">
                      <span>{position.location}</span>
                      <span>{position.type}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="hover:bg-primary hover:text-white">
                    <ArrowRight size={16} />
                  </Button>
                </div>
              ))}
            </div>
            
            <Button className="bg-gradient-to-r from-primary to-secondary text-white">
              View All Positions
            </Button>
          </div>
          
          <div className="lg:w-1/2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80" 
                alt="Team working together" 
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-secondary/10 rounded-2xl -z-10"></div>
              
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 glass-card p-6 rounded-xl shadow-lg text-center w-4/5 border-t-4 border-primary">
                <h3 className="font-bold mb-2">Our Culture</h3>
                <p className="text-sm text-gray-600">
                  We foster a culture of innovation, continuous learning, and work-life balance. Our diverse team collaborates in an inclusive environment where everyone's ideas are valued.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersSection;
