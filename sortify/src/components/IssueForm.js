import React, { useState } from 'react';
import './IssueForm.css';

const IssueForm = ({ onSubmit, loading }) => {
  const [issueText, setIssueText] = useState('');
  const [email, setEmail] = useState('');
  const [contactMethod, setContactMethod] = useState('email');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(issueText, email, contactMethod);
  };

  return (
    <div className="issue-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="issueText">Describe your issue:</label>
          <textarea
            id="issueText"
            value={issueText}
            onChange={(e) => setIssueText(e.target.value)}
            placeholder="Please describe your issue in detail..."
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="email">Your Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />
        </div>

        <div className="form-group">
          <label>Preferred Contact Method:</label>
          <div className="contact-methods">
            <label>
              <input
                type="radio"
                name="contactMethod"
                value="email"
                checked={contactMethod === 'email'}
                onChange={(e) => setContactMethod(e.target.value)}
              />
              Email
            </label>
            <label>
              <input
                type="radio"
                name="contactMethod"
                value="whatsapp"
                checked={contactMethod === 'whatsapp'}
                onChange={(e) => setContactMethod(e.target.value)}
              />
              WhatsApp
            </label>
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Submit Issue'}
        </button>
      </form>
    </div>
  );
};

export default IssueForm;
