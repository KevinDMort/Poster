import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { signup } from '../lib/auth.js';
import { useNavigate } from 'react-router-dom';
import '../styling/LoginPage.css'; // Reusing the styles from LoginPage.css

function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        setError(false);
        const user = await signup(username, email, password);
        console.log(user);
        if (user) {
            navigate('/');
        } else {
            setError(true);
        }
    }; 

    return (
        <div className="container">
            <Sidebar/>
            <div className="login-page-container"> 
                <div className="login-form-container"> 
                    <h2>Sign up</h2>
                    <form onSubmit={handleSignup}>
                        <input
                            type="text" 
                            placeholder="Username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="login-input" 
                        />
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
                        <button type="submit" className="login-button">Sign up</button> 
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
