import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import '../styles/Register.css';

const Register = () => {
    const [user, setUser] = useState({ username: '', password: '', email: '', firstName: '', lastName: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await authService.register(user);
            alert("Registration successful!");
            navigate('/login');
        } catch (err) { 
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Create Account</h2>
                {error && <div style={{ color: '#d63a52', marginBottom: '15px', fontSize: '0.9rem' }}>{error}</div>}
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input 
                            id="username"
                            name="username" 
                            placeholder="Choose a username" 
                            value={user.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            id="email"
                            name="email" 
                            type="email" 
                            placeholder="Enter your email" 
                            value={user.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input 
                            id="firstName"
                            name="firstName" 
                            placeholder="Enter your first name" 
                            value={user.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input 
                            id="lastName"
                            name="lastName" 
                            placeholder="Enter your last name" 
                            value={user.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            id="password"
                            name="password" 
                            type="password" 
                            placeholder="Create a strong password" 
                            value={user.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button className="register-btn" type="submit">Create Account</button>
                </form>
                <div className="register-footer">
                    Already have an account? <button onClick={() => navigate('/login')}>Login here</button>
                </div>
            </div>
        </div>
    );
};
export default Register;