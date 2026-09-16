import { lazy, Suspense, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const loadWithMinimumDelay = (importer, minimumDelay = 300) => (
  Promise.all([
    importer(),
    new Promise((resolve) => setTimeout(resolve, minimumDelay)),
  ]).then(([module]) => module)
);

const Projects = lazy(() => loadWithMinimumDelay(() => import('./pages/Projects')));
const Contact = lazy(() => loadWithMinimumDelay(() => import('./pages/Contact')));

function PageLoadingFallback() {
  return (
    <div className="page-loading" role="status" aria-live="polite">
      <span className="loading-spinner" aria-hidden="true" />
      <span>Loading page...</span>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={`app-shell ${darkMode ? 'dark' : 'light'}`}>
      <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="page-content">
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
