function Skills({ skillList = [] }) {
  return (
    <section id="skills" className="card">
      <p className="section-label">Skills</p>
      <h2>Tools I enjoy working with</h2>
      <div className="skill-list">
        {skillList.map((skill) => (
          <span key={skill} className="skill-chip">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

export default Skills;
