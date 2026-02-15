import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import '../styles/Login.css';

const Login = () => {
    const [creds, setCreds] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const token = await authService.login(creds);
            
            // DEBUG: Check your browser console to see if the token arrived
            console.log("Login successful! Token:", token);
            
            loginUser(token);
            navigate('/dashboard');
        } catch (err) { 
            console.error("Login failed:", err);
            setError("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
                {error && <div style={{ color: '#d63a52', marginBottom: '15px', fontSize: '0.9rem' }}>{error}</div>}
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input 
                            id="username"
                            name="username" 
                            placeholder="Enter your username" 
                            value={creds.username}
                            onChange={(e) => setCreds({...creds, username: e.target.value})} 
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            id="password"
                            name="password" 
                            type="password" 
                            placeholder="Enter your password" 
                            value={creds.password}
                            onChange={(e) => setCreds({...creds, password: e.target.value})} 
                            required
                        />
                    </div>
                    <button className="login-btn" type="submit">Login</button>
                </form>
                <div className="login-footer">
                    Don't have an account? <button onClick={() => navigate('/register')}>Register here</button>
                </div>
            </div>
        </div>
    );
};
export default Login;