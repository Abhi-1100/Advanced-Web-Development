import React from 'react';

export default function Spinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <div className="spinner" aria-label="Loading">
        Loading...
      </div>
    </div>
  );
}
