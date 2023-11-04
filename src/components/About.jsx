import React from "react";
import "./About.css"; // Import your CSS file
import dev from "../images/devendra.png"
import nishtha from "../images/nishtha.jpg"
import agam from "../images/agam.jpg"
import atul from "../images/Atulkar Rajput.jpg"

const About = () => {
  return (
    <div className="about-us">
      <div className="about-content">
        <h2>About Us</h2>
        <p>
          We are a team of dedicated individuals who created this lost and found platform. Our aim is to make it easier for people to connect with their lost belongings or find items they have found. This project was made possible by the support of our university, CT University, and the coordinators who provided us with this opportunity.
        </p>
        <h3>Meet Our Team</h3>
        <div className="team-members">
          <div className="team-member">
            <img src={dev} alt="Devendra Jha" />
            <h4>Devendra Jha</h4>
            <p>Team Member</p>
          </div>
          <div className="team-member">
            <img src={nishtha} alt="Nishtha Jain" />
            <h4>Nishtha Jain</h4>
            <p>Team Member</p>
          </div>
          <div className="team-member">
            <img src={agam} alt="Agam Mittal" />
            <h4>Agam Mittal</h4>
            <p>Team Member</p>
          </div>
          <div className="team-member">
            <img src={atul} alt="Atulkar Rajput" />
            <h4>Atulkar Rajput</h4>
            <p>Team Member</p>
          </div>
        </div>
        <p>Thank you for visiting our website and using our platform. Your support is greatly appreciated!</p>
      </div>
    </div>
  );
};

export default About;
