
import { useState } from 'react';

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FaqItem = ({ question, answer, isOpen, onClick }: FaqItemProps) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={onClick}
      >
        <h3 className="text-lg font-medium">{question}</h3>
        <svg
          className={`w-6 h-6 transform ${isOpen ? 'rotate-180' : ''} transition-transform`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div
        className={`mt-2 text-gray-600 ${isOpen ? 'block' : 'hidden'}`}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
};

const FaqSection = () => {
  const faqs = [
    {
      question: "How does the self-healing functionality work?",
      answer: "SuVikshan uses machine learning to understand the structure and relationships between elements in your application. When a test fails due to UI changes, our AI analyzes alternative locators and dynamically updates your test code to adapt to these changes, without requiring manual intervention."
    },
    {
      question: "Does SuVikshan support my testing framework?",
      answer: "Yes! SuVikshan integrates seamlessly with Selenium, Cypress, Playwright, Appium, TestNG and many other popular testing frameworks. Our API allows easy connection to almost any test automation solution."
    },
    {
      question: "How much maintenance time can I save with SuVikshan?",
      answer: "Our customers typically report 60-80% reduction in test maintenance efforts after implementing SuVikshan. The exact time savings depend on your application's update frequency and complexity."
    },
    {
      question: "Is SuVikshan suitable for large enterprise applications?",
      answer: "Absolutely! SuVikshan is built to scale and is currently being used by several Fortune 500 companies with complex, multi-platform applications. Our enterprise tier includes dedicated support and customizations for large-scale deployments."
    },
    {
      question: "How secure is SuVikshan with our test data?",
      answer: "Security is our top priority. SuVikshan is SOC 2 Type II compliant and offers on-premise deployment options for enterprises with strict data security requirements. We never store your application data or test results without permission."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 md:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about SuVikshan
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFaq(index)}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-600 mb-4">
            Still have questions?
          </p>
          <a
            href="#contact"
            className="text-electricBlue hover:underline font-medium"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
