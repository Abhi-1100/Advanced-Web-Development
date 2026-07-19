function Footer({ email, github }) {
  return (
    <footer className="footer-card">
      <p>© 2026 Abhi Dev</p>
      <div className="footer-links">
        <a href={`mailto:${email}`}>{email}</a>
        <a href={github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
    </footer>
  );
}

export default Footer;
