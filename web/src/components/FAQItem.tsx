'use client'; // Required for Next.js components that use state/interaction

import React, { useState } from 'react';

// 1. Define the shape of our data
interface FAQItem {
  question: string;
  answer: string;
}

// 2. The example data
const defaultQuestions: FAQItem[] = [
  {
    question: "How do I reset my password?",
    answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page. We will send you an email with instructions."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and Apple Pay."
  },
  {
    question: "Can I cancel my subscription?",
    answer: "Yes, you can cancel your subscription at any time from your account settings page. The cancellation will be effective at the end of the current billing cycle."
  }
];

const FAQCard = () => {
  // State to track which item is currently open. 
  // Use 'number' for the index, or 'null' if all are closed.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    // If clicking the item that is already open, close it (set to null).
    // Otherwise, open the new item.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-[300px] flex flex-col gap-4">
      {defaultQuestions.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div 
            key={index} 
            className="w-full rounded-lg border border-primary bg-white shadow-sm overflow-hidden transition-all duration-300"
          >
            {/* 
              Header / Question 
              - Added onClick handler
              - Removed group-hover logic
            */}
            <button
              onClick={() => handleToggle(index)}
              className="w-full flex cursor-pointer items-center justify-between p-4 bg-gray-50 hover:bg-white transition-colors text-left"
              type="button"
            >
              <h3 className="font-medium text-gray-900 select-none">
                {item.question}
              </h3>
              
              {/* Icon: Rotates based on 'isOpen' state */}
              <span 
                className={`material-symbols-outlined text-gray-500 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>

            {/* 
              Answer / Content 
              - Uses CSS Grid for smooth height animation
              - Toggles grid-rows based on 'isOpen' state
            */}
            <div 
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="p-4 pt-0 text-gray-600 text-sm border-t border-gray-100">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FAQCard;