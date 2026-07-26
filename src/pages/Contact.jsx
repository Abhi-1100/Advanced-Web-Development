import { useState } from 'react';

function Contact() {
  const [message, setMessage] = useState('');
  const [showHelp, setShowHelp] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  return (
    <section className="contact-page">
      <div className="contact-panel">
        <div>
          <p className="section-label">Contact</p>
          <h1>Let&apos;s build something together</h1>
          <p className="section-description">
            Have a project idea, internship opportunity, or collaboration? Send a message and I&apos;ll reply quickly.
          </p>
        </div>
        <div className="contact-stats">
          <div>
            <strong>Fast response</strong>
            <span>Typically within 24 hours</span>
          </div>
          <div>
            <strong>Preferred tools</strong>
            <span>React, MERN, IoT, digital logic</span>
          </div>
        </div>
      </div>

      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-row">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
          />
        </div>
        <div className="form-row">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="6"
            placeholder="Tell me about your project or idea"
          />
        </div>

        <div className="form-footer">
          <div>
            <p className="char-count">Characters: {message.length}</p>
            <p className="live-preview">Live preview: {message || 'Type a message to preview it here.'}</p>
          </div>
          <button type="button" className="submit-btn">
            Send Message
          </button>
        </div>
      </form>

      <div className="contact-info">
        <div>
          <h2>Contact details</h2>
          <p>Email: <a href="mailto:abhikakadiya1043@gmail.com">abhikakadiya1043@gmail.com</a></p>
          <p>LinkedIn: <a href="https://linkedin.com/in/abhi-kakadiya-336680340" target="_blank" rel="noreferrer">abhi-kakadiya-336680340</a></p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
