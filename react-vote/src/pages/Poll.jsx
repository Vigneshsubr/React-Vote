import React from "react";
import PollTab from "./PollTab";
//import electronic from "../asserts/images/electronic.jpg"; // Image path

const Poll = () => {
  return (
    <div
      style={{
        position: "relative",
        //minHeight: "100vh",
        overflow: "hidden",
       // backgroundImage: `url(${electronic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
     
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
         // backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay
        }}
      ></div>

      
      <div style={{ position: "relative", color: "white", padding: "20px" }}>
        <h3 className="fst-italic mb-4">Manage Polls</h3>
        <PollTab />
      </div>
    </div>
  );
};

export default Poll;
