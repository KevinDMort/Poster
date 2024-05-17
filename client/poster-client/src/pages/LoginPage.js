
import React, { useState } from 'react';
import {login} from '../lib/auth.js'

function LoginPage({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

  const handleLogin = async (event) => {
     event.preventDefault();
        setError(false);
        const user = await login(email, password);
        if (user) {
        onLogin(user);
        } else {
        setError(true);
        }
  }; 

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
