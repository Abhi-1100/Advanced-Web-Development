import React from 'react';

export default function ErrorMessage({ message = 'An error occurred', onRetry }) {
  return (
    <div style={{ padding: '1rem', border: '1px solid #e07', background: '#ffecec' }}>
      <p style={{ margin: 0 }}>Error: {message}</p>
      {onRetry && (
        <button style={{ marginTop: '0.5rem' }} onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
