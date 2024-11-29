import React, { useState } from "react";
import { usePostResultMutation } from "../redux/services/resultApi";
 import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";

const CalculateResultsPage = () => {
  const [pollId, setPollId] = useState("");
  const [postResult, { isLoading, error, isSuccess }] = usePostResultMutation();
   const navigate = useNavigate();

   const handleViewResult =()=>{
    navigate('/dashboard/viewresult');
   }

  const handleCalculateResults = async () => {
    try {
      await postResult(pollId).unwrap();
      // navigate(`/dashboard/poll/results/${pollId}`);
    } catch (err) {
      console.error("Failed to calculate results:", err);
    }
  };

  return (
    <div className="container py-4">

      <div className="row align-items-center">
        <div className="col-6 ">
          <h4 className="fst-italic text-light">Calculate Poll Results</h4>
        </div>
        <div className="col-6 d-flex justify-content-end">
        <Button className="btn btn-primary " onClick={handleViewResult}>Result</Button>
        </div>
      </div>
      
      
      <div className="col-6">
        <Label htmlFor="pollId" className="form-label text-light"><strong>Poll ID:</strong></Label>
        <Input
          type="text"
          id="pollId"
          value={pollId}
          onChange={(e) => setPollId(e.target.value)}
          className="form-control"
        />
      </div>
      <Button
        onClick={handleCalculateResults}
        disabled={isLoading}
        className="btn btn-primary mt-3"
      >
        {isLoading ? "Calculating..." : "Calculate Results"}
      </Button>

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
