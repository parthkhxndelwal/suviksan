
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-20 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Business with Technology?
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Partner with Suviksan Technologies to unlock your business potential through innovative IT solutions tailored to your unique needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="px-6 py-6 bg-white text-primary hover:bg-opacity-90 transition-all flex items-center justify-center text-lg font-medium">
                Schedule a Consultation
                <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button variant="outline" className="px-6 py-6 border-2 border-white text-white hover:bg-white/10 transition-all flex items-center justify-center text-lg font-medium">
                View Our Services
              </Button>
            </div>
            <p className="mt-6 text-sm text-white/80">
              No obligation consultation. Let's discuss how we can help.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
