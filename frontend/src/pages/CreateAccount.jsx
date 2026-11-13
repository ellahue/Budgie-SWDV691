import { useState } from 'react';

function CreateAccount({ onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
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
  page: { padding: '40px 24px', maxWidth: '480px', margin: '0 auto', width: '100%', boxSizing: 'border-box' },  createTitle: { textAlign: 'center', fontSize: '24px', margin: '10px 0 30px', fontWeight: '600' },
  form: { display: 'flex', flexDirection: 'column' },
  label: { textAlign: 'left', fontSize: '14px', marginBottom: '6px', fontWeight: '500' },
  input: { padding: '14px', marginBottom: '18px', border: '1px solid #ccc', borderRadius: '10px', fontSize: '16px' },
  button: { padding: '16px', background: '#96bff1', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' },
  backButton: { background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', marginBottom: '10px' },
  message: { textAlign: 'center', marginTop: '16px', fontSize: '14px' },
};

export default CreateAccount;