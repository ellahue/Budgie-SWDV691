import { useState } from 'react';

function Login({ onSwitchToCreate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setMessage('Logged in successfully!');
      } else {
        setMessage(data.error || 'Something went wrong');
      }
    } catch (err) {
      setMessage('Could not connect to server');
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Budgie</h1>
      <p style={styles.tagline}>Stay on budget while you travel</p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Login</button>
      </form>

      <p style={styles.or}>or</p>
      <button type="button" onClick={onSwitchToCreate} style={styles.linkButton}>
        Create an account
      </button>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  page: { padding: '40px 24px', maxWidth: '480px', margin: '0 auto', width: '100%', boxSizing: 'border-box' },
  title: { textAlign: 'center', fontSize: '32px', color: '#102a43', margin: '20px 0 8px', fontWeight: '700' },
  tagline: { textAlign: 'center', color: 'black', marginBottom: '40px', fontSize: '15px' },
  form: { display: 'flex', flexDirection: 'column' },
  label: { color: 'black', textAlign: 'left', fontSize: '14px', marginBottom: '6px', fontWeight: '500' },
  input: { padding: '14px', marginBottom: '18px', border: '1px solid #ccc', borderRadius: '10px', fontSize: '16px' },
  button: { padding: '14px', background: '#96bff1', color: '#102a43', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)', border: '1px solid #75a8e8', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', alignSelf: 'center' , width: '200px', marginTop: '10px'},
  linkButton: { background: 'none', border: 'none', color: '#244f85', textDecoration: 'underline', fontSize: '15px', cursor: 'pointer' },
  message: { padding: '12px', borderRadius: '8px', marginBottom: '10px', fontSize: '14px', textAlign: 'center', marginTop: '16px' },
};

export default Login;