import React, { useState, useEffect } from 'react';
import './App.css';
import IssueForm from './components/IssueForm';
import Results from './components/Results';
import About from './components/About';
import FAQ from './components/FAQ';

function App() {
  const [showResults, setShowResults] = useState(false);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (issueText, email, contactMethod) => {
    setLoading(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      // Simple classification based on keywords
      const keywords = issueText.toLowerCase();
      if (keywords.includes('technical') || keywords.includes('error') || keywords.includes('bug')) {
        setCategory('Technical Support');
      } else if (keywords.includes('billing') || keywords.includes('payment') || keywords.includes('invoice')) {
        setCategory('Billing');
      } else if (keywords.includes('account') || keywords.includes('password') || keywords.includes('login')) {
        setCategory('Account Management');
      } else if (keywords.includes('feedback') || keywords.includes('suggestion') || keywords.includes('improvement')) {
        setCategory('Product Feedback');
      } else {
        setCategory('General Inquiry');
      }
      
      setShowResults(true);
      setLoading(false);
    }, 1500);
  };

  // Handle smooth scrolling for navigation
  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('href');
      
      if (targetId === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (targetId) {
        const targetElement = document.getElementById(targetId.substring(1));
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    const navLinks = document.querySelectorAll('.nav-links a');
    const logo = document.querySelector('.nav-content h1');
    
    // Add click event to logo
    if (logo) {
      logo.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    navLinks.forEach(link => {
      if (link.getAttribute('href').startsWith('#')) {
        link.addEventListener('click', handleScroll);
      }
    });

    return () => {
      if (logo) {
        logo.removeEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
      
      navLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
          link.removeEventListener('click', handleScroll);
        }
      });
    };
  }, []);

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-content">
          <h1>Sortify</h1>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#faq">FAQ</a>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <section id="hero" className="hero-section">
          <div className="hero-content">
            <h2>Issue Classification Service</h2>
            <p>Get your issues resolved faster with our intelligent classification system</p>
            {!showResults ? (
              <IssueForm onSubmit={handleSubmit} loading={loading} />
            ) : (
              <Results category={category} onReset={() => setShowResults(false)} />
            )}
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="about-content">
            <h2>About Sortify</h2>
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
        </section>

        <section id="faq" className="faq-section">
          <div className="faq-content">
            <h2>FAQ</h2>
            <FAQ />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <h3>Sortify</h3>
        </div>
      </footer>
    </div>
  );
}

export default App;
