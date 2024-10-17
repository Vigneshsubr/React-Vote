import React from "react";
import dashboardImage from '../asserts/images/dashboard image.jpg'; // Adjust path as needed

const HomePage = () => {
    return (
        <div
            style={{
                height: "100vh",
                backgroundImage: `url(${dashboardImage})`, // Use imported image
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
                    background: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay for better text visibility
                    padding: "20px",
                    borderRadius: "8px",
                    textAlign: "center",
                }}
            >
                <h1 className="text-white">Welcome to My Vote</h1>
                <p className="text-white">Your voice matters. Join us to make a difference!</p>
            </div>
        </div>
    );
};

export default HomePage;
