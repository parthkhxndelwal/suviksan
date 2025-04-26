import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ShaderCarousel from './ShaderCarousel';

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const portfolioImages = [
    '/images/portfolio/1.jpg',
    '/images/portfolio/2.jpg',
    '/images/portfolio/3.jpg',
    '/images/portfolio/4.jpg',
    '/images/portfolio/5.jpg',
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="portfolio" className="py-20 px-4 md:px-8 bg-white" ref={sectionRef}>
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-lg text-gray-600">
            Explore our latest projects and success stories
          </p>
        </div>

        <div className="relative w-full h-[70vh] overflow-hidden rounded-lg shadow-xl">
          <ShaderCarousel images={portfolioImages} />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg shadow-lg"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={image}
                  alt={`Portfolio item ${index + 1}`}
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="px-6 py-2 bg-white text-black rounded-full font-semibold transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
