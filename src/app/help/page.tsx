'use client';

import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/Accordian";
import Link from 'next/link';

const HelpAndSupport = () => {


  const faqs = [
    {
      question: "How do I get started with Maths2Fun?",
      answer: "Getting started is easy! Simply sign up for an account, and you'll have immediate access to our collection of mathematical puzzles. Begin with the beginner-level puzzles and progress as you improve."
    },
    {
      question: "I forgot my password. What should I do?",
      answer: "Click on the 'Forgot Password' link on the login page. Enter your registered email address, and we'll send you instructions to reset your password."
    },
    {
      question: "How do I track my progress?",
      answer: "Your progress is automatically tracked in your profile. Visit your profile page to see your completed puzzles, achievements, and overall progress statistics."
    },
    {
      question: "Can I suggest new puzzles?",
      answer: "Yes! We welcome puzzle suggestions from our community. Please use our contact form to submit your ideas, and our team will review them."
    },
    {
      question: "How do the difficulty levels work?",
      answer: "Puzzles are categorized into Beginner, Intermediate, and Advanced levels. Each level is carefully designed to match different skill levels and learning stages."
    }
  ];

  

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8">Help & Support</h1>
      
      {/* Search Bar */}
      <div className="mb-8">
       
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <CustomCard
          title="Contact Support"
          description="Need direct assistance? Reach out to our support team."
        >
          <Link href="/contact">
            <button className="w-full md:w-auto bg-transparent border-2 border-[#4ECDC4] text-[#4ECDC4] px-6 py-3 md:px-8 md:py-4 font-bold hover:bg-[#4ECDC4] hover:text-white transition-colors duration-300 text-sm md:text-base">
              Contact Us
            </button>
          </Link>
        </CustomCard>
        
        <CustomCard
          title="Video Tutorials"
          description="Watch our helpful tutorial videos to get started."
        >
          <button className="w-full md:w-auto bg-transparent border-2 border-[#4ECDC4] text-[#4ECDC4] px-6 py-3 md:px-8 md:py-4 font-bold hover:bg-[#4ECDC4] hover:text-white transition-colors duration-300 text-sm md:text-base">
            Loading...
          </button>
        </CustomCard>
        
        <CustomCard
          title="User Guide"
          description="Download our comprehensive user guide."
        >
          <button className="w-full md:w-auto bg-transparent border-2 border-[#4ECDC4] text-[#4ECDC4] px-6 py-3 md:px-8 md:py-4 font-bold hover:bg-[#4ECDC4] hover:text-white transition-colors duration-300 text-sm md:text-base">
            Loading...
          </button>
        </CustomCard>
      </div>

      {/* FAQs Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Additional Support Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Still Need Help?</h2>
        <p className="mb-4">
          If you couldn`&lsquo;`t find what you`&lsquo;`re looking for, our support team is here to help.
          You can reach us through any of the following channels:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Email: support@maths2fun.com</li>
        </ul>
        <p className="text-sm text-gray-600">
          Our typical response time is within 24 hours during business days.
        </p>
      </div>
    </div>
  );
};


interface CustomCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  description,
  children,
  className = '',
}) => {
  return (
    <div className={`p-6 text-center hover:shadow-lg transition-shadow rounded-lg border border-gray-200 bg-white ${className}`}>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      {children}
    </div>
  );
};



export default HelpAndSupport; 