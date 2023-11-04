import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../firebase"; // Import your initialized Firebase app
import './Profile.css';

const auth = getAuth(app); // Initialize Firebase Authentication
const db = getDatabase(app); // Initialize Firebase Realtime Database

function Profile() {
    const [userData, setUserData] = useState(null);

    // Use Firebase's onAuthStateChanged to listen for changes in the authentication state
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in
                const userRef = ref(db, `users/${user.uid}`);
                try {
                    const snapshot = await get(userRef);
                    if (snapshot.exists()) {
                        setUserData(snapshot.val());
                    }
                } catch (error) {
                    console.error('Error fetching user data: ', error);
                }
            } else {
                // User is signed out
                setUserData(null);
            }
        });
    }, []);

    const handleLogout = () => {
        // Log the user out
        signOut(auth)
            .then(() => {
                // User is successfully logged out
                // You can perform any necessary actions here, such as redirecting the user
                
            })
            .catch((error) => {
                // Handle any errors
                console.error('Error logging out: ', error);
            });
    };

    return (
        <div className="user-profile-container">
            {userData ? (
                <div className="user-profile">
                    <h2>User Profile</h2>
                    <div className="avatar">
                        {userData.fullName ? userData.fullName.charAt(0).toUpperCase() : ''}
                    </div>
                    <p>Name: {userData.fullName}</p>
                    <p>Email: {userData.email}</p>
                    <p>Mobile Number: {userData.mobileNumber}</p>
                    <p>Address: {userData.address}</p>
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            ) : (
                <p>Not logged in.</p>
            )}
        </div>
    );
}

export default Profile;
