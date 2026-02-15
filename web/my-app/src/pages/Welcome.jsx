import { useNavigate } from 'react-router-dom';
import '../styles/Welcome.css';

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="welcome-container">
            <div className="welcome-left">
                <div className="welcome-content">
                    <h1>Welcome to this Mini App</h1>
                    <p>Explore authentication features and secure user management. Choose an option below to get started.</p>
                    <div className="welcome-buttons">
                        <button className="btn-login" onClick={() => navigate('/login')}>
                            ➤ Login
                        </button>
                        <button className="btn-register" onClick={() => navigate('/register')}>
                            ➤ Register
                        </button>
                    </div>
                </div>
            </div>
            <div className="welcome-right">
                <div className="welcome-image-placeholder">
                    <svg viewBox="0 0 200 200" className="welcome-icon">
                        <circle cx="100" cy="100" r="95" fill="none" stroke="#e8e8e8" strokeWidth="2" />
                        <polygon points="80,60 80,140 140,100" fill="#4CAF50" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
