import React from "react";
import { Link } from "react-router-dom"; // Ensure you have react-router-dom installed and set up for routing
//import dashboardImage from '../assets/images/dashboard-image.jpg'; 
import digitalvote from '../asserts/images/digitalvote.jpg';

const HomePage = () => {
    return (
        <div
            style={{
                height: "100vh",
                backgroundImage: `url(${digitalvote})`, 
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
            }}
        >
            <div
                style={{
                    background: "rgba(0, 0, 0, 0.5)", 
                    padding: "20px",
                    borderRadius: "8px",
                    textAlign: "center",
                }}
            >
                <h1 className="text-white">Welcome to My Vote</h1>
                <p className="text-white">Your voice matters. Join us to make a difference!</p>
                
                <div style={{ marginTop: "20px" }}>
                    <Link to="/signin" className="btn btn-primary mx-2">Sign In</Link>
                    <Link to="/signup" className="btn btn-secondary mx-2">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
