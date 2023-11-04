import React from "react";
import './home.css'; 
import pic1 from "../images/logolf.png"
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-container">
            <div className="left-content">
                <img src={pic1} alt="Your Image" />
            </div>
            <div className="right-content">
                <h1>Welcome to Lost & Found Hub</h1>
                <h2>Your Connection to Lost Items and Their Owners</h2>
                <p>Explore a vast collection of lost and found items from across the globe. Whether you've lost something valuable or found an item with a story, we're here to help. Connect with owners and reunite lost items with their rightful homes. Join our community of finders and seekers today!</p>

                <Link to="/Post" className="home-button">Post An Item</Link>
            
                
            </div>
        </div>
    );
}

export default Home;
