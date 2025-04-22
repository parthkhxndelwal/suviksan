
import { Check } from 'lucide-react';

interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const PricingTier = ({ name, price, description, features, isPopular = false }: PricingTierProps) => {
  return (
    <div className={`bg-white rounded-xl shadow-md p-8 border ${isPopular ? 'border-electricBlue' : 'border-transparent'} relative`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-electricBlue text-white text-xs font-semibold py-1 px-3 rounded-full">Most Popular</span>
        </div>
      )}
      
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">{price}</span>
        {price !== 'Custom' && <span className="text-gray-600">/month</span>}
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <button 
        className={`w-full py-2 rounded-lg font-medium transition-colors
          ${isPopular 
            ? 'bg-gradient-to-r from-electricBlue to-softPurple text-white' 
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
      >
        {isPopular ? 'Get Started' : 'Choose Plan'}
      </button>
    </div>
  );
};

const PricingSection = () => {
  const pricingTiers = [
    {
      name: "Starter",
      price: "$299",
      description: "Perfect for small teams just getting started with test automation.",
      features: [
        "Self-healing for up to 250 tests",
        "Basic reporting dashboard",
        "Email support",
        "1 project",
        "3 team members"
      ]
    },
    {
      name: "Professional",
      price: "$699",
      description: "Ideal for growing teams with established test suites.",
      features: [
        "Self-healing for unlimited tests",
        "Advanced analytics dashboard",
        "Priority email & chat support",
        "5 projects",
        "10 team members",
        "CI/CD integration"
      ],
      isPopular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for large organizations with complex needs.",
      features: [
        "Everything in Professional",
        "Unlimited projects",
        "Unlimited team members",
        "24/7 dedicated support",
        "On-premise deployment option",
        "Custom integrations",
        "Dedicated account manager"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 md:px-8 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-gray-600">
            Choose the plan that's right for your team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <PricingTier
              key={index}
              name={tier.name}
              price={tier.price}
              description={tier.description}
              features={tier.features}
              isPopular={tier.isPopular}
            />
          ))}
        </div>

        <div className="text-center mt-12 text-gray-600">
          <p>All plans include a 14-day free trial. No credit card required.</p>
          <p className="mt-2">Need a custom solution? <a href="#contact" className="text-electricBlue hover:underline">Contact us</a></p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
