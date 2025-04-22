
const PartnerLogos = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Trusted <span className="text-gradient">Partners</span>
          </h2>
          <p className="text-gray-600">
            We collaborate with industry-leading technology companies
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* These would be actual logos in production */}
          {['Microsoft', 'AWS', 'Google Cloud', 'Oracle', 'SAP', 'IBM', 
            'Salesforce', 'Adobe', 'Cisco', 'VMware', 'Red Hat', 'Dell'].map((name, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center justify-center p-4 glass-card rounded-lg h-24 card-hover"
            >
              <div className="w-10 h-10 bg-gray-200 rounded mb-2"></div>
              <span className="text-sm text-gray-600">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;
