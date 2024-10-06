import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Set persistence to localStorage
      await setPersistence(auth, browserLocalPersistence);

      // Sign in the user with email and password
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/profile');
    } catch (error) {
      console.error('Error object:', error);
      switch (error.code) {
        case 'auth/invalid-credential':
          alert('Invalid credentials provided. Please check your email and password.');
          break;
        default:
          alert('Login failed. Please try again.');
          break;
      }
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/signup">Sign Up</a></p>
    </div>
  );
}

export default Login;
