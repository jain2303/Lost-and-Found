import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, getAuth } from "firebase/auth"; // Import Firebase Authentication
import { getDatabase, ref, get } from "firebase/database";
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";
import logo from "../images/lofo.png";
import "./navigation.css";

const auth = getAuth();

function Navigation() {
    const [showLoginDialog, setShowLoginDialog] = useState(false);
    const [showRegisterDialog, setShowRegisterDialog] = useState(false);
    const [user, setUser] = useState(null);

    const openLoginDialog = () => {
        setShowLoginDialog(true);
    };

    const closeLoginDialog = () => {
        setShowLoginDialog(false);
    };

    const openRegisterDialog = () => {
        setShowRegisterDialog(true);
    };

    const closeRegisterDialog = () => {
        setShowRegisterDialog(false);
    };

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const db = getDatabase();
                const userRef = ref(db, `users/${currentUser.uid}/fullName`);

                get(userRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        setUser(snapshot.val());
                    }
                });
            } else {
                setUser(null);
                // Open the login dialog when there is no logged-in user
                openLoginDialog();
            }
        });
    }, []);

    return (
        <nav className="container">
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Lost">Lost Items</Link></li>
                <li><Link to="/Found">Found Items</Link></li>
                <li><Link to="/Post">Post an Item</Link></li>
                <li><Link to="/Contact">Profile</Link></li>
                <li><Link to="/About">About Us</Link></li>
            </ul>
            {user ? (
                <div className="user-profileName">
                    <p className="fname">Hello, {user}</p>
                </div>
            ) : (
                <button className="login-button" onClick={openLoginDialog}>Login</button>
            )}
            {showLoginDialog && (
                <LoginDialog onClose={closeLoginDialog} onOpenRegisterDialog={openRegisterDialog} />
            )}
            {showRegisterDialog && (
                <RegisterDialog onClose={closeRegisterDialog} onOpenLoginDialog={openLoginDialog} />
            )}
        </nav>
    );
}

export default Navigation;
