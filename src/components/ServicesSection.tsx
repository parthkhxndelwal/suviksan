
import { Database, Globe, Monitor, Shield, Settings, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ServiceCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => {
  return (
    <div className="glass-card p-6 rounded-xl card-hover">
      <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10">
        <Icon size={24} className="text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      icon: Monitor,
      title: "Custom Software Development",
      description: "Tailored software solutions designed to address your unique business challenges and requirements."
    },
    {
      icon: Globe,
      title: "Web & Mobile Applications",
      description: "Responsive web applications and native mobile apps that deliver exceptional user experiences."
    },
    {
      icon: Database,
      title: "Cloud Services",
      description: "Strategic cloud migration, infrastructure design, and managed cloud services for optimal performance."
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Comprehensive security assessments, implementation, and monitoring to protect your digital assets."
    },
    {
      icon: Users,
      title: "IT Consulting",
      description: "Expert guidance for technology strategy, digital transformation, and operational excellence."
    },
    {
      icon: Settings,
      title: "DevOps Services",
      description: "Streamlined development and operations through continuous integration and delivery pipelines."
    },
  ];

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1 bg-blue-50 rounded-full text-primary font-medium mb-4">
            Our Services
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprehensive <span className="text-gradient">IT Solutions</span> for Your Business
          </h2>
          <p className="text-lg text-gray-600">
            We offer a wide range of IT services tailored to meet the unique needs of your business, helping you stay competitive in the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-gradient-to-r from-primary to-secondary text-white px-8">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
