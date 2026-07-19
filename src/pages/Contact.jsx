import { useState } from 'react';

function Contact() {
  const [message, setMessage] = useState('');
  const [showHelp, setShowHelp] = useState(true);

  return (
    <section className="card">
      <h1>Contact Me</h1>
      <p>Type a message below to see it update in real time.</p>
      <button className="toggle-btn" onClick={() => setShowHelp((prev) => !prev)}>
        {showHelp ? 'Hide Help' : 'Show Help'}
      </button>
      {showHelp && <p className="help-text">Please share your project idea or feedback.</p>}
      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="5"
        placeholder="Write your message here..."
      />
      <p className="char-count">Characters: {message.length}</p>
      <p className="live-preview">Preview: {message || 'Your message will appear here'}</p>
    </section>
  );
}

export default Contact;
