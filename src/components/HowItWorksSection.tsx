
const StepCard = ({ number, title, description }: { number: number, title: string, description: string }) => {
  return (
    <div className="relative">
      {/* Step number */}
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-electricBlue to-softPurple text-white flex items-center justify-center text-xl font-bold mb-6">
        {number}
      </div>
      
      {/* Connector line (except for last item) */}
      {number < 5 && (
        <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-gradient-to-r from-electricBlue to-softPurple -z-10"></div>
      )}
      
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const HowItWorksSection = () => {
  const steps = [
    {
      title: "Add SuVikshan",
      description: "Integrate SuVikshan into your existing test framework with our simple SDK."
    },
    {
      title: "Run Tests",
      description: "Execute your test suite as usual through your preferred testing platform."
    },
    {
      title: "Detect Changes",
      description: "SuVikshan automatically detects UI changes and element relocations."
    },
    {
      title: "Auto-heal",
      description: "Tests are automatically repaired using our proprietary AI algorithms."
    },
    {
      title: "Report",
      description: "Receive detailed reports of changes detected and fixes applied."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="gradient-text">SuVikshan</span> Works
          </h2>
          <p className="text-lg text-gray-600">
            Our AI-powered platform makes test automation maintenance effortless
          </p>
        </div>

        <div className="relative">
          {/* Desktop view */}
          <div className="hidden md:grid grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                number={index + 1}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
          
          {/* Mobile view */}
          <div className="md:hidden space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex">
                <div className="mr-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-electricBlue to-softPurple text-white flex items-center justify-center text-xl font-bold">
                    {index + 1}
                  </div>
                  {/* Vertical connector line */}
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-12 bg-gradient-to-b from-electricBlue to-softPurple mx-auto mt-2"></div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sample visualization */}
        <div className="mt-20 bg-white p-8 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-center">See it in action</h3>
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-softPurple-light flex items-center justify-center">
                <svg className="w-8 h-8 text-softPurple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <p className="text-gray-500">Interactive demo visualization would appear here</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
