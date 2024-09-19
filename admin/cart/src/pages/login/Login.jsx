import { useDispatch } from 'react-redux';
import { login } from '../../redux/apiCalls';
import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await login(dispatch, { username, password });
      // Call onLogin callback passed from parent component (App) if login succeeds
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure (show error message, reset form fields, etc.)
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Feriwala Admin Login</h2>
        <input
          style={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={styles.button} onClick={handleClick}>Login</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(to right, #11998e, #38ef7d)',
    fontFamily: 'Arial, sans-serif',
  },
  loginBox: {
    width: '100%',
    maxWidth: '400px',
    padding: '40px',
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '15px',
    marginBottom: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
  },
  inputFocus: {
    borderColor: ' #11998e',
  },
  button: {
    width: '100%',
    padding: '15px',
    background: ' #11998e',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  buttonHover: {
    background: ' #38ef7d',
  },
};

export default Login;

