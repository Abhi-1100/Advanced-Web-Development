function Header({ name, title, themeColor }) {
  return (
    <section className="hero-card">
      <div className="hero-badge">Student Portfolio • Practical 2</div>
      <h1>
        Hi, I’m <span>{name}</span>
      </h1>
      <p className="hero-subtitle">{title}</p>
      <div className="hero-actions">
        <a className="btn btn-primary" href="#skills">
          Explore Skills
        </a>
        <a className="btn btn-secondary" href="/contact">
          Contact Me
        </a>
      </div>
      <div className="hero-metric" style={{ ['--accent']: themeColor }}>
        <div>
          <strong>3+</strong>
          <span>Projects</span>
        </div>
        <div>
          <strong>100%</strong>
          <span>Responsive</span>
        </div>
        <div>
          <strong>24/7</strong>
          <span>Creative</span>
        </div>
      </div>
    </section>
  );
}

export default Header;
