import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './LoginDialog.css';

function LoginDialog({ onClose, onOpenRegisterDialog }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const auth = getAuth(); // Get the Firebase Authentication instance

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Sign in with email and password
            await signInWithEmailAndPassword(auth, email, password);
            onClose(); // Close the login dialog on successful login
        } catch (error) {
            // Handle login errors
            setError(error.message);
        }
    };

    const openRegister = () => {
        onOpenRegisterDialog();
    };

    return (
        <div className="login-dialog">
            <button className="close-button" onClick={onClose}>&times;</button>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                {error && <div className="error-message">{error}</div>}
                <button type="submit">Login</button>
            </form>
            <h6 onClick={openRegister}>New User? Register Here</h6>
        </div>
    );
}

export default LoginDialog;
