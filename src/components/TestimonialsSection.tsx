
import { useState } from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  image: string;
  stars: number;
}

const Testimonial = ({ quote, name, role, company, image, stars }: TestimonialProps) => (
  <div className="bg-white p-8 rounded-xl shadow-md">
    <div className="flex mb-4">
      {Array(stars).fill(0).map((_, i) => (
        <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
      ))}
    </div>
    <p className="text-gray-700 mb-6 italic">"{quote}"</p>
    <div className="flex items-center">
      <img src={image} alt={name} className="w-12 h-12 rounded-full mr-4 object-cover" />
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-600">{role}, {company}</p>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const testimonials: TestimonialProps[] = [
    {
      quote: "SuVikshan has reduced our test maintenance burden by 85%. Now our QA team can focus on creating new tests instead of fixing broken ones.",
      name: "Sarah Johnson",
      role: "QA Lead",
      company: "TechNova",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      stars: 5
    },
    {
      quote: "The self-healing capabilities are mind-blowing. Our tests keep running even after significant UI updates that would have broken traditional automation.",
      name: "Michael Chen",
      role: "DevOps Engineer",
      company: "CloudScale",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      stars: 5
    },
    {
      quote: "We've seen a 70% reduction in false positives since implementing SuVikshan. The intelligent healing and reporting have transformed our testing strategy.",
      name: "Emma Rodriguez",
      role: "Automation Architect",
      company: "FinTech Solutions",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      stars: 5
    },
    {
      quote: "Integration with our CI/CD pipeline was seamless. Now we have confidence our tests will keep working even as our application evolves.",
      name: "David Park",
      role: "CTO",
      company: "RetailAI",
      image: "https://randomuser.me/api/portraits/men/54.jpg",
      stars: 5
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section id="testimonials" className="py-20 px-4 md:px-8 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by <span className="gradient-text">Testing Teams</span> Worldwide
          </h2>
          <p className="text-lg text-gray-600">
            See what our customers have to say about SuVikshan
          </p>
        </div>

        {/* Mobile view: Single testimonial with navigation */}
        <div className="md:hidden">
          <Testimonial {...testimonials[currentIndex]} />
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, i) => (
              <button 
                key={i}
                className={`w-3 h-3 rounded-full ${i === currentIndex ? 'bg-electricBlue' : 'bg-gray-300'}`}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop view: Grid of testimonials */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <Testimonial {...testimonial} />
            </div>
          ))}
        </div>
        
        {/* Logos */}
        <div className="mt-20">
          <p className="text-center text-sm text-gray-500 mb-8">TRUSTED BY INNOVATIVE COMPANIES</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
            <div className="h-8 w-24 bg-gray-300 rounded"></div>
            <div className="h-8 w-24 bg-gray-300 rounded"></div>
            <div className="h-8 w-24 bg-gray-300 rounded"></div>
            <div className="h-8 w-24 bg-gray-300 rounded"></div>
            <div className="h-8 w-24 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
