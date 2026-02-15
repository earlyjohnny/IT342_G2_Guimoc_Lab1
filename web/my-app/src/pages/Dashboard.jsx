import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const { isAuthenticated, logoutUser } = useAuth();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) navigate('/login');
        else {
            authService.getCurrentUser()
                .then(res => {
                    console.log('API Response:', res.data); // Debug: See what's being returned
                    setProfile(res.data);
                })
                .catch((err) => { 
                    console.error('Error fetching user:', err);
                    setError(err.response?.data?.message || 'Failed to load profile');
                    logoutUser(); 
                    navigate('/login'); 
                });
        }
    }, [isAuthenticated]);

    if (!profile) return <div className="dashboard-container"><div className="dashboard-loading">Loading...</div></div>;

    // Handle different response structures from the backend
    const displayName = profile.firstName || profile.name || profile.username || 'User';
    const displayEmail = profile.email || 'Not available';
    const displayUsername = profile.username || 'Not available';

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <h2>Welcome, {displayName}!</h2>
                <div className="dashboard-info">
                    <strong>Email:</strong> {displayEmail}
                </div>
                <div className="dashboard-info">
                    <strong>Username:</strong> {displayUsername}
                </div>
                <button className="logout-btn" onClick={() => { logoutUser(); navigate('/login'); }}>Logout</button>
            </div>
        </div>
    );
};
export default Dashboard;