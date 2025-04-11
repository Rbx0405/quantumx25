import React from 'react';
import './Results.css';

const Results = ({ category, onReset }) => {
  const categories = {
    'Technical Support': {
      icon: '🛠️',
      description: 'Your issue has been routed to our technical support team. They will help you resolve any technical difficulties you are experiencing.'
    },
    'Billing': {
      icon: '💰',
      description: 'Your billing inquiry has been forwarded to our finance department. They will help you with any billing-related questions or issues.'
    },
    'Account Management': {
      icon: '👤',
      description: 'Your account-related issue has been forwarded to our account management team. They will assist you with any account-related concerns.'
    },
    'Product Feedback': {
      icon: '💡',
      description: 'Your feedback has been shared with our product development team. They value your suggestions and will consider them for future improvements.'
    },
    'General Inquiry': {
      icon: '❓',
      description: 'Your inquiry has been forwarded to the appropriate department. You will receive a response soon.'
    }
  };

  const categoryInfo = categories[category] || {
    icon: '✅',
    description: 'Your issue has been successfully submitted and will be addressed shortly.'
  };

  return (
    <div className="results">
      <div className="result-header">
        <h2>{categoryInfo.icon} Issue Categorized</h2>
        <button onClick={onReset} className="reset-button">
          Submit Another Issue
        </button>
      </div>
      <div className="result-content">
        <h3>Category: {category}</h3>
        <p>{categoryInfo.description}</p>
      </div>
    </div>
  );
};

export default Results;
