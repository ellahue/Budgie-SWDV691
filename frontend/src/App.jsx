import { useState } from 'react';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const url = isLogin
      ? 'http://localhost:3001/api/auth/login'
      : 'http://localhost:3001/api/auth/register';

    const body = isLogin
      ? { email, password }
      : { email, password, name };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setMessage(isLogin ? 'Logged in successfully!' : 'Account created!');
      } else {
        setMessage(data.error || 'Something went wrong');
      }
    } catch (err) {
      setMessage('Could not connect to server');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.phone}>
        {isLogin ? (
          // LOGIN PAGE
          <>
            <h1 style={styles.title}>Budgie</h1>
            <p style={styles.tagline}>Stay on budget while you travel</p>

            <form onSubmit={handleSubmit}>
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

              <p style={styles.forgot}>Forgot Password?</p>

              <button type="submit" style={styles.button}>Login</button>
            </form>

            <p style={styles.or}>or</p>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              style={styles.linkButton}
            >
              Create an account
            </button>
          </>
        ) : (
          // CREATE ACCOUNT PAGE
          <>
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              style={styles.backButton}
            >
              ← 
            </button>
            <h2 style={styles.createTitle}>Create an Account</h2>

            <form onSubmit={handleSubmit}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />

              <label style={styles.label}>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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

              <button type="submit" style={styles.button}>Create Account</button>
            </form>
          </>
        )}

        {message && (
          <p style={{ ...styles.message, color: message.includes('success') ? 'green' : 'red' }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f0f0f0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  phone: {
    width: '100%',
    maxWidth: '380px',
    background: 'white',
    borderRadius: '20px',
    padding: '30px 24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    minHeight: '600px',
  },
  title: {
    textAlign: 'center',
    fontSize: '28px',
    margin: '10px 0 4px',
    color: '#244f85',
  },
  tagline: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#666',
    marginBottom: '30px',
  },
  createTitle: {
    textAlign: 'center',
    fontSize: '22px',
    margin: '10px 0 30px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    marginBottom: '6px',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '16px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '15px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '14px',
    background: '#96bff1',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px',
  },
  forgot: {
    textAlign: 'right',
    fontSize: '13px',
    color: '#244f85',
    margin: '-8px 0 16px',
    cursor: 'pointer',
  },
  or: {
    textAlign: 'center',
    margin: '16px 0 8px',
    color: '#888',
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: '#244f85',
    fontSize: '15px',
    cursor: 'pointer',
    textDecoration: 'underline',
    width: '100%',
  },
  backButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  message: {
    textAlign: 'center',
    marginTop: '16px',
    fontSize: '14px',
  },
};

export default App;