import React, { useState, useEffect } from "react";
import { useGetResultsQuery } from "../redux/services/resultApi";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useParams } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const PollResultsPage = () => {
  const { pollId: pollIdFromUrl } = useParams();
  const [pollId, setPollId] = useState(pollIdFromUrl || "");
  const [submittedPollId, setSubmittedPollId] = useState(pollIdFromUrl || null);

  const { data, error, isLoading } = useGetResultsQuery(submittedPollId, { skip: !submittedPollId });
  const [candidateChartData, setCandidateChartData] = useState(null);
  const [percentageChartData, setPercentageChartData] = useState(null);

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

  const handleSubmit = () => {
    setSubmittedPollId(pollId);
  };

  return (
    <div className="container mt-5">
      <h4 className="fst-italic">Poll Results</h4>
      <div className="input-group mb-3">
        <label htmlFor="pollId" className="form-label me-3">Enter Poll ID:</label>
        <input
          type="text"
          id="pollId"
          value={pollId}
          onChange={(e) => setPollId(e.target.value)}
          className="form-control"
        />
        <button onClick={handleSubmit} disabled={!pollId} className="btn btn-primary ms-3">
          Show Results
        </button>
      </div>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      {data && (
        <>
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Total Votes</th>
                <th>Vote Percentage</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((result) => (
                <tr key={result.candidateId}>
                  <td>{result.candidateName}</td>
                  <td>{result.totalVotes}</td>
                  <td>{result.votePercentage.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex gap-4 mt-4">
            {candidateChartData && (
              <div style={{ width: "45%", height: "400px" }}>
                <h5>Number of Candidates</h5>
                <Pie data={candidateChartData} />
              </div>
            )}

            {percentageChartData && (
              <div style={{ width: "45%", height: "400px" }}>
                <h5>Vote Percentage</h5>
                <Pie data={percentageChartData} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PollResultsPage;
