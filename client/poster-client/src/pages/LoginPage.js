import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { login } from '../lib/auth.js';
import '../styling/LoginPage.css';

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
      <div className="container">
        <Sidebar/>
        <div className="login-page-container">
            <div className="login-form-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                    />
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
        </div>
    );
}

export default LoginPage;
