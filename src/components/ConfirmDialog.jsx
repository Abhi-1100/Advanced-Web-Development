function ConfirmDialog({ task, isDeleting, onConfirm, onCancel }) {
  return (
    <div className="dialog-backdrop" role="presentation">
      <div className="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="delete-title">
        <h2 id="delete-title">Delete task?</h2>
        <p>This will permanently remove "{task.title}".</p>
        <div className="dialog-actions">
          <button type="button" onClick={onCancel} disabled={isDeleting}>Cancel</button>
          <button className="danger-btn" type="button" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete task'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;