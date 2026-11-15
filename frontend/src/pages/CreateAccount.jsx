import { useState } from 'react';

function CreateAccount({ onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setMessage('Account created!');
      } else {
        setMessage(data.error || 'Something went wrong');
      }
    } catch (err) {
      setMessage('Could not connect to server');
    }
  };

  return (
    <div style={styles.page}>
      <button type="button" onClick={onSwitchToLogin} style={styles.backButton}>←</button>
      <h2 style={styles.createTitle}>Create an Account</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Email</label>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />

        <label style={styles.label}>Name</label>
        <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} />

        <label style={styles.label}>Password</label>
        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />

        <button type="submit" style={styles.button}>Create Account</button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  page: { position: 'relative', padding: '40px 24px', maxWidth: '480px', margin: '0 auto', width: '100%', boxSizing: 'border-box' },
  form: { display: 'flex', flexDirection: 'column' },
  createTitle: { textAlign: 'center', fontSize: '20px', margin: '0 0 30px', fontWeight: '600', padding: '0 40px' },
  label: { color: 'black', textAlign: 'left', fontSize: '14px', marginBottom: '6px', fontWeight: '600' },
  input: { padding: '14px', marginBottom: '18px', border: '1px solid #ccc', borderRadius: '10px', fontSize: '16px' },
  button: { padding: '14px', background: '#96bff1', color: '#102a43', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)', border: '1px solid #75a8e8', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', alignSelf: 'center' , width: '200px', marginTop: '10px'},
  backButton: { position: 'absolute', lineheight: '1', top: '32px', left: '24px', background: 'none', border: 'none', fontSize: '30px', cursor: 'pointer', marginBottom: '10px' },
  message: { textAlign: 'center', marginTop: '16px', fontSize: '14px' },
};

export default CreateAccount;