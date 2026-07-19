function ProjectsList({ projects = [] }) {
  return (
    <section className="card">
      <p className="section-label">Projects</p>
      <h2>Selected work</h2>
      <div className="project-grid">
        {projects.map((project) => (
          <article key={project.title} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProjectsList;
