import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const questions = [
    {
      question: "How does Sortify work?",
      answer: "Sortify uses advanced AI algorithms to analyze your issue description and automatically categorize it into the appropriate department. This ensures your issue reaches the right team for resolution."
    },
    {
      question: "What types of issues can I submit?",
      answer: "You can submit any type of issue related to our services, including technical problems, billing questions, account management, product feedback, and general inquiries."
    },
    {
      question: "How long does it take to get a response?",
      answer: "Our system processes your issue immediately and routes it to the appropriate team. You can expect a response within our standard response time, which varies by department."
    },
    {
      question: "Can I submit issues via WhatsApp?",
      answer: "Yes! You can choose to submit your issue via email or WhatsApp. Just select your preferred contact method when submitting your issue."
    },
    {
      question: "Is my information secure?",
      answer: "Absolutely! We take your privacy seriously. All your information is encrypted and processed securely."
    }
  ];

  return (
    <div className="faq-section">
      <h2>FAQ</h2>
      <div className="faq-content">
        {questions.map((q, index) => (
          <div
            key={index}
            className={`faq-item ${activeQuestion === index ? 'active' : ''}`}
            onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
          >
            <div className="faq-question">
              <h3>{q.question}</h3>
              <span className="faq-arrow">{activeQuestion === index ? '▼' : '▶'}</span>
            </div>
            {activeQuestion === index && (
              <div className="faq-answer">
                <p>{q.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
