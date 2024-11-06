import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function VoteForm() {
    const { electionId } = useParams(); // Get the election ID from the URL
    const [polls, setPolls] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [selectedPoll, setSelectedPoll] = useState(null);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [message, setMessage] = useState('');

    // Fetch polls for the election
    useEffect(() => {
        async function fetchPolls() {
            try {
                const response = await axios.get(`/api/v1/elections/${electionId}/polls`);
                setPolls(response.data);
            } catch (error) {
                console.error("Error fetching polls:", error);
            }
        }
        fetchPolls();
    }, [electionId]);

    // Fetch candidates when a poll is selected
    useEffect(() => {
        if (!selectedPoll) return;
        
        async function fetchCandidates() {
            try {
                const response = await axios.get(`/api/v1/polls/${selectedPoll}/candidates`);
                setCandidates(response.data);
            } catch (error) {
                console.error("Error fetching candidates:", error);
            }
        }
        fetchCandidates();
    }, [selectedPoll]);

    // Handle form submission for casting the vote
    const handleVoteSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
            const response = await axios.post(
                '/api/v1/votes/cast',
                { pollId: selectedPoll, candidateId: selectedCandidate },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage(response.data);
        } catch (error) {
            setMessage("Error casting vote: " + (error.response?.data || error.message));
        }
    };

    return (
        <div>
            <h2>Vote for an Election</h2>
            <form onSubmit={handleVoteSubmit}>
                <div>
                    <label>Select Poll:</label>
                    <select onChange={(e) => setSelectedPoll(e.target.value)} required>
                        <option value="">--Select Poll--</option>
                        {polls.map((poll) => (
                            <option key={poll.id} value={poll.id}>
                                {poll.pollName}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Select Candidate:</label>
                    <select
                        onChange={(e) => setSelectedCandidate(e.target.value)}
                        required
                        disabled={!selectedPoll}
                    >
                        <option value="">--Select Candidate--</option>
                        {candidates.map((candidate) => (
                            <option key={candidate.id} value={candidate.id}>
                                {candidate.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" disabled={!selectedPoll || !selectedCandidate}>
                    Cast Vote
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default VoteForm;
