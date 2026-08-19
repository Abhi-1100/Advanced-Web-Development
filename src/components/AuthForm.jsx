import { useState } from 'react';
import { forgotPassword, login, register, resetPassword, setAuthToken } from '../api';

function AuthForm({ onAuthenticated }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError(null);
    setNotice(null);
    setIsSubmitting(true);

    try {
      if (mode === 'forgot') {
        const result = await forgotPassword(email);
        if (result.devResetToken) {
          setResetToken(result.devResetToken);
          setMode('reset');
          setNotice('Development reset token created. Set a new password below.');
        } else {
          setNotice(result.message);
        }
        return;
      }

      if (mode === 'reset') {
        await resetPassword(resetToken, password);
        setMode('login');
        setPassword('');
        setResetToken('');
        setNotice('Password reset successfully. You can now log in.');
        return;
      }

      const action = mode === 'login' ? login : register;
      const result = await action({ email, password });

      if (mode === 'register') {
        setMode('login');
        setPassword('');
        setNotice('Account created. Log in with your new password.');
      } else {
        setAuthToken(result.token);
        onAuthenticated();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-panel">
      <div className="auth-heading">
        <p className="section-label">Private workspace</p>
        <h2>{mode === 'login' ? 'Welcome back' : mode === 'register' ? 'Create your account' : mode === 'forgot' ? 'Recover access' : 'Choose a new password'}</h2>
        <p>{mode === 'login' ? 'Sign in to access your protected tasks.' : mode === 'register' ? 'Register to start managing tasks securely.' : 'Your account details stay protected by the server.'}</p>
      </div>
      <form className="auth-form" onSubmit={submit}>
        {mode !== 'reset' && <>
          <label htmlFor="auth-email">Email address</label>
          <input id="auth-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </>}
        {mode === 'reset' && <>
          <label htmlFor="reset-token">Reset token</label>
          <input id="reset-token" value={resetToken} onChange={(event) => setResetToken(event.target.value)} required />
        </>}
        {mode !== 'forgot' && <>
          <label htmlFor="auth-password">{mode === 'reset' ? 'New password' : 'Password'}</label>
          <input id="auth-password" type="password" minLength="6" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </>}
        {error && <p className="auth-error" role="alert">{error}</p>}
        {notice && <p className="auth-note" role="status">{notice}</p>}
        <button className="submit-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Please wait...' : mode === 'login' ? 'Log in' : mode === 'register' ? 'Register' : mode === 'forgot' ? 'Send reset request' : 'Reset password'}
        </button>
      </form>
      {mode === 'login' && <button className="auth-link" type="button" onClick={() => { setMode('forgot'); setError(null); setNotice(null); }}>Forgot password?</button>}
      <button className="auth-switch" type="button" onClick={() => { setMode(mode === 'login' || mode === 'forgot' || mode === 'reset' ? 'register' : 'login'); setError(null); setNotice(null); }}>
        {mode === 'register' ? 'Already registered? Log in' : 'Need an account? Register'}
      </button>
      {(mode === 'forgot' || mode === 'reset') && <button className="auth-switch" type="button" onClick={() => { setMode('login'); setError(null); setNotice(null); }}>Back to log in</button>}
    </div>
  );
}

export default AuthForm;