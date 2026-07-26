import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

// Replace this with your GitHub username to show your repos
const GITHUB_USERNAME = 'Abhi-1100';

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  const fetchRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      // Ensure we have an array (GitHub returns array on success)
      setRepos(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch repositories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = repos.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <section className="projects-page">
      <div className="section-header">
        <div>
          <p className="section-label">Projects</p>
          <h1>Selected Work</h1>
        </div>
        <p className="section-description">
          A dynamic list of GitHub repositories fetched from the public API.
        </p>
      </div>

      {loading && <Spinner />}
      {error && <ErrorMessage message={error} onRetry={fetchRepos} />}

      {!loading && !error && (
        <div>
          <div style={{ margin: '1rem 0' }}>
            <input
              aria-label="Search repositories"
              placeholder="Search repositories by name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ padding: '0.5rem', width: '100%', maxWidth: 480 }}
            />
          </div>

          <div className="project-grid">
            {filtered.length === 0 ? (
              <p>No repositories found.</p>
            ) : (
              filtered.map((repo) => (
                <article key={repo.id} className="project-card">
                  <h2>
                    <a href={repo.html_url} target="_blank" rel="noreferrer">
                      {repo.name}
                    </a>
                  </h2>
                  <p>{repo.description}</p>
                  <p>⭐ {repo.stargazers_count ?? 0}</p>
                </article>
              ))
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
