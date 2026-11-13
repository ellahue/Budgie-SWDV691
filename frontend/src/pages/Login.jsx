import { useState } from 'react';

function Login({ onSwitchToCreate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
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
  title: { textAlign: 'center', fontSize: '32px', color: '#244f85', margin: '20px 0 8px', fontWeight: '700' },
  tagline: { textAlign: 'center', color: '#555', marginBottom: '40px', fontSize: '15px' },
  form: { display: 'flex', flexDirection: 'column' },
  label: { textAlign: 'left', fontSize: '14px', marginBottom: '6px', fontWeight: '500' },
  input: { padding: '14px', marginBottom: '18px', border: '1px solid #ccc', borderRadius: '10px', fontSize: '16px' },
  button: { padding: '16px', background: '#96bff1', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' },
  linkButton: { background: 'none', border: 'none', color: '#244f85', textDecoration: 'underline', fontSize: '15px', cursor: 'pointer' },
  message: { textAlign: 'center', marginTop: '16px', fontSize: '14px' },
};

export default Login;