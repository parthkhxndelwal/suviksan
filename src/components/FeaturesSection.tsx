
import { Activity, Bell, Zap, Calendar, Check, Users, FileText } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm card-hover">
      <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-gradient-to-r from-electricBlue/10 to-softPurple/10">
        <Icon size={24} className="text-electricBlue" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: "Self-Healing Engine",
      description: "Automatically repairs broken tests without human intervention using AI algorithms."
    },
    {
      icon: FileText,
      title: "Smart Test Reports",
      description: "Get visual, easy-to-understand test reports with actionable insights and recommendations."
    },
    {
      icon: Activity,
      title: "CI/CD Integration",
      description: "Seamlessly integrate with Jenkins, GitHub Actions, GitLab CI, and other popular pipelines."
    },
    {
      icon: Bell,
      title: "Real-time Notifications",
      description: "Receive instant alerts when tests fail with detailed diagnostics and healing status."
    },
    {
      icon: Users,
      title: "Collaborative Workspace",
      description: "Share testing insights with team members and stakeholders in real-time."
    },
    {
      icon: Calendar,
      title: "Scheduled Testing",
      description: "Schedule tests to run automatically at specified intervals or triggers."
    },
  ];

  return (
    <section id="features" className="py-20 px-4 md:px-8 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for <span className="gradient-text">Modern Testing</span>
          </h2>
          <p className="text-lg text-gray-600">
            SuVikshan comes packed with everything you need to build and maintain reliable test suites that heal themselves.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-col md:flex-row items-center p-2 bg-white rounded-lg shadow-sm">
            <span className="text-gray-700 font-medium px-4">Compatible with:</span>
            <div className="flex flex-wrap justify-center">
              <div className="px-4 py-2">Selenium</div>
              <div className="px-4 py-2">Cypress</div>
              <div className="px-4 py-2">Playwright</div>
              <div className="px-4 py-2">Appium</div>
              <div className="px-4 py-2">TestNG</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
