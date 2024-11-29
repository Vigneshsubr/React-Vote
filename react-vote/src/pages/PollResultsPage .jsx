import React, { useState, useEffect } from "react";
import { useGetResultsQuery } from "../redux/services/resultApi";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useParams } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const PollResultsPage = () => {
  const { pollId: pollIdFromUrl } = useParams();
  const [pollId, setPollId] = useState(pollIdFromUrl || "");
  const [submittedPollId, setSubmittedPollId] = useState(pollIdFromUrl || null);
  const [userRole, setUserRole] = useState(null);

  const { data, error, isLoading } = useGetResultsQuery(submittedPollId, { skip: !submittedPollId });
  const [candidateChartData, setCandidateChartData] = useState(null);
  const [percentageChartData, setPercentageChartData] = useState(null);

  const navigate=useNavigate();

  useEffect(() => {
    if (data) {
      const labels = data.data.map((result) => result.candidateName);
      const votePercentages = data.data.map((result) => result.votePercentage);

      setCandidateChartData({
        labels,
        datasets: [
          {
            label: "Candidates",
            data: Array(labels.length).fill(1),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#F7464A", "#46BFBD", "#FDB45C"],
            hoverOffset: 4,
          },
        ],
      });

      setPercentageChartData({
        labels,
        datasets: [
          {
            label: "Vote Percentage",
            data: votePercentages,
            backgroundColor: ["#8E44AD", "#3498DB", "#E74C3C", "#2ECC71"],
            hoverOffset: 4,
          },
        ],
      });
    }
  }, [data]);

  useEffect(() => {
    const token = localStorage.getItem("Token") || sessionStorage.getItem("Token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.Role); 
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  const handleSubmit = () => {
    setSubmittedPollId(pollId);
  };

  const handleResult=()=>{
   navigate('/dashboard/calculateresult') 
  }


  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <h4 className="fst-italic mb-0 text-light">Poll Results</h4>
        {userRole === "ADMIN" && (
          <button className="btn btn-success" onClick={handleResult}>Calculate Result</button>
        )}
      </div>

      <div className="d-flex justify-content-start  align-items-start mb-3">
        <label htmlFor="pollId" className="form-label me-3 text-light">Enter Poll ID:</label>
        <input
          type="text"
          id="pollId"
          value={pollId}
          onChange={(e) => setPollId(e.target.value)}
          className="form-control w-50"
        />
        <button
          onClick={handleSubmit}
          disabled={!pollId}
          className="btn btn-primary ms-3"
        >
          Show Results
        </button>
      </div>

      {isLoading && <div className="text-center text-light">Loading...</div>}
      {error && <div className="text-center text-danger">Error: {error.message}</div>}

      {data && (
        <>
          <table className="table table-bordered table-responsive mt-3">
            <thead className="table-primary">
              <tr>
                <th>Candidate</th>
                <th>Total Votes</th>
                <th>Vote Percentage</th>
                <th>Calculated At</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((result) => (
                <tr key={result.candidateId}>
                  <td>{result.candidateName}</td>
                  <td>{result.totalVotes}</td>
                  <td>{result.votePercentage.toFixed(2)}%</td>
                  <td>{result.calculatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex row mt-4 justify-content-center">
            <div className="col-6 mb-3">
            {candidateChartData && (
              <div style={{ width: "100%", height: "300px" }}>
                <h5 className="text-light  ps-3 ms-5 ">No. Candidates</h5>
                <Pie data={candidateChartData} />
              </div>
            )}
            </div>

           <div className="col-6 mb-3">
           {percentageChartData && (
              <div style={{ width: "100%", height: "300px" }}>
                <h5 className="text-light ps-3 ms-5">Vote Percentage</h5>
                <Pie data={percentageChartData} />
              </div>
            )}
           </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PollResultsPage;
