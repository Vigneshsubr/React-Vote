import React, { useState } from "react";
import { usePostResultMutation } from "../redux/services/resultApi";
// import { useNavigate } from "react-router-dom";

const CalculateResultsPage = () => {
  const [pollId, setPollId] = useState("");
  const [postResult, { isLoading, error, isSuccess }] = usePostResultMutation();
  // const navigate = useNavigate();

  const handleCalculateResults = async () => {
    try {
      await postResult(pollId).unwrap();
      // navigate(`/dashboard/poll/results/${pollId}`);
    } catch (err) {
      console.error("Failed to calculate results:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h4 className="fst-italic">Calculate Poll Results</h4>
      <div className="col-6">
        <label htmlFor="pollId" className="form-label"><strong>Poll ID:</strong></label>
        <input
          type="text"
          id="pollId"
          value={pollId}
          onChange={(e) => setPollId(e.target.value)}
          className="form-control"
        />
      </div>
      <button
        onClick={handleCalculateResults}
        disabled={isLoading}
        className="btn btn-primary mt-3"
      >
        {isLoading ? "Calculating..." : "Calculate Results"}
      </button>

      {isSuccess && <p className="alert alert-success mt-3">Your result was calculated successfully!</p>}

      {error?.status === 400 && (
        <div className="alert alert-danger mt-3">
          {error.data?.message || "An error occurred while calculating the results."}
        </div>
      )}

      {error?.status === 409 && (
        <div className="alert alert-warning mt-3">
          {error.data?.message || "Poll results have already been calculated."}
        </div>
      )}
    </div>
  );
};

export default CalculateResultsPage;
