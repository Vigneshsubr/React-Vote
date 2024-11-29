import React from "react";
import { Pie } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const ElectionDashboard = () => {
 
  const electionData = {
    labels: ["Candidate A", "Candidate B", "Candidate C"],
    datasets: [
      {
        data: [40, 30, 30],
        backgroundColor: ["#007BFF", "#FFC107", "#28A745"],
        borderWidth: 1,
      },
    ],
  };

  const pollData = {
    labels: ["Option 1", "Option 2", "Option 3", "Option 4"],
    datasets: [
      {
        data: [25, 25, 30, 20],
        backgroundColor: ["#FF5733", "#C70039", "#900C3F", "#581845"],
        borderWidth: 1,
      },
    ],
  };

  const navigate = useNavigate();

  const handlevote = () => {
    navigate("/dashboard/elections");
  };

  return (
    <div className="container py-4">
      <div className="row align-items-center mb-4">
        <div className="col-6">
          <h3 className="fst-italic text-light">Election Dashboard</h3>
        </div>
        <div className="col-6 text-end">
          <Button className="btn btn-primary me-2 px-5" onClick={handlevote}>
            Vote
          </Button>
        </div>
      </div>

     
      <div className="row">
        <div className="col-md-12">
          <div
            className="card shadow-sm"
            style={{
              padding: "10px",
              maxWidth: "1100px",
              margin: "auto",
            }}
          >
            <div className="card-body p-3">
              <div className="row">
               
                <div className="col-md-6 mb-3 d-flex justify-content-center">
                  <div style={{ width: "300px", height: "400px" }}>
                    <h6 className="text-center text-primary">Election Results</h6>
                    <Pie
                      data={electionData}
                      options={{
                        maintainAspectRatio: false,
                      }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </div>
               
                <div className="col-md-6 mb-3 d-flex justify-content-center">
                  <div style={{ width: "300px", height: "400px" }}>
                    <h6 className="text-center text-success">Poll Results</h6>
                    <Pie
                      data={pollData}
                      options={{
                        maintainAspectRatio: false,
                      }}  
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionDashboard;
