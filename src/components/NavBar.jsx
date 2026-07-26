import { Link, NavLink } from 'react-router-dom';

function NavBar({ darkMode, toggleDarkMode }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">ABHI DEV</Link>

        <div className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => (isActive ? 'active' : '')}>
            Projects
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
            Contact
          </NavLink>
        </div>

        <button className="theme-btn" onClick={toggleDarkMode} aria-label="Toggle theme">
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
