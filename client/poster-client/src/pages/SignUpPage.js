import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { signup } from '../lib/auth.js';
import { useNavigate } from 'react-router-dom';
import '../styling/LoginPage.css'; 
import { Link } from 'react-router-dom';

function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        setError(false);
        const user = await signup(username, email, password, location, description);
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
                        <input
                        type="text" 
                        placeholder="Location" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="login-input" 
                        />
                        <input
                        type="text" 
                        placeholder="Description" 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="login-input" 
                        />
                        <button type="submit" className="login-button">Sign up</button> 
                    </form>
                    <div className="signup-redirect">
                        <p>Already have an account? <Link to="/login" className="signup-link">Log in</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
