
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Web Development', 'Mobile Apps', 'Cloud Solutions', 'AI & ML', 'Enterprise Software'];
  
  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
      description: "Complete e-commerce solution with payment integration and inventory management"
    },
    {
      title: "Healthcare Mobile App",
      category: "Mobile Apps",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80",
      description: "Patient management app with telemedicine capabilities"
    },
    {
      title: "Cloud Migration Project",
      category: "Cloud Solutions",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
      description: "Migration of legacy systems to AWS cloud infrastructure"
    },
    {
      title: "AI-Powered Analytics",
      category: "AI & ML",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
      description: "Business intelligence platform with predictive analytics features"
    },
    {
      title: "ERP Implementation",
      category: "Enterprise Software",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80", 
      description: "Custom ERP solution for manufacturing company"
    },
    {
      title: "Finance Management System",
      category: "Enterprise Software",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=600&q=80",
      description: "Comprehensive financial management and reporting system"
    },
  ];
  
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  return (
    <section id="portfolio" className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-4 py-1 bg-blue-50 rounded-full text-primary font-medium mb-4">
            Our Portfolio
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Recent <span className="text-gradient">Projects</span> & Success Stories
          </h2>
          <p className="text-lg text-gray-600">
            Explore our diverse portfolio of successful projects across various industries and technologies
          </p>
        </div>
        
        {/* Portfolio Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-all ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div key={index} className="group overflow-hidden rounded-xl shadow-lg card-hover">
              <div className="relative overflow-hidden h-64">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-sm text-white/80 mb-1">{project.category}</span>
                  <h3 className="text-xl text-white font-bold">{project.title}</h3>
                  <p className="text-white/80 text-sm mt-2">{project.description}</p>
                  <button className="mt-4 text-white flex items-center text-sm">
                    View Details <ArrowRight size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-gradient-to-r from-primary to-secondary text-white px-8">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
