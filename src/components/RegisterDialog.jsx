import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../firebase"; // Import your initialized Firebase app
import './RegisterDialog.css';

const auth = getAuth(app); // Initialize Firebase Authentication
const db = getDatabase(app); // Initialize Firebase Realtime Database

function RegisterDialog({ onClose, onOpenLoginDialog }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create a user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save user details in the Realtime Database
            const userRef = ref(db, `users/${user.uid}`);
            set(userRef, {
                fullName,
                email,
                mobileNumber,
                address,
            });

            onClose();
        } catch (error) {
            // Handle registration errors here
            console.error('Registration error:', error);
        }
    }

    const openLoginDialog = () => {
        onClose(); // Close the RegisterDialog
        onOpenLoginDialog(); // Open the LoginDialog
    };

    return (
        <div className="register-dialog">
            <button className="close-button" onClick={onClose}>&times;</button>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Full Name"
                    value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                <input type="email" placeholder="Email"
                    value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="tel" placeholder="Mobile Number"
                    value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
                <input type="text" placeholder="Address"
                    value={address} onChange={(e) => setAddress(e.target.value)} required />
                <button type="submit">Register</button>
            </form>
            <h6 onClick={openLoginDialog}>Existing User? Login Here</h6>
        </div>
    );
}

export default RegisterDialog;
