function About({ bio, highlights }) {
  return (
    <section className="card about-card">
      <p className="section-label">About Me</p>
      <h2>Building modern web experiences with React</h2>
      <p>{bio}</p>
      <ul className="highlight-list">
        {highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default About;
