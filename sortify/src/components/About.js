import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-section">
      <h2>About Sortify</h2>
      <div className="about-content">
        <div className="about-text">
          <p>
            Sortify is an intelligent issue classification service designed to streamline your customer support process. Our advanced AI system automatically categorizes customer issues and routes them to the appropriate department, ensuring faster resolution and better customer satisfaction.
          </p>
          <p>
            With Sortify, you can:
            <ul>
              <li>Submit issues via email or WhatsApp</li>
              <li>Get instant issue categorization</li>
              <li>Track your issue status</li>
              <li>Receive timely responses from the right team</li>
            </ul>
          </p>
        </div>
        <div className="about-stats">
          <div className="stat-item">
            <h3>95%</h3>
            <p>Accuracy Rate</p>
          </div>
          <div className="stat-item">
            <h3>24/7</h3>
            <p>Support Available</p>
          </div>
          <div className="stat-item">
            <h3>100%</h3>
            <p>Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
