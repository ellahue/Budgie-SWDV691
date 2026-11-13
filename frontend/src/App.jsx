import { useState } from 'react';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';

function App() {
  const [page, setPage] = useState('login');

  return (
    <div style={{ minHeight: '100vh', background: '#f8f6f6', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {page === 'login' ? (
        <Login onSwitchToCreate={() => setPage('create')} />
      ) : (
        <CreateAccount onSwitchToLogin={() => setPage('login')} />
      )}
    </div>
  );
}

export default App;