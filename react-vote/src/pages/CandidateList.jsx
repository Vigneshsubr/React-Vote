import React, { useEffect, useState } from 'react';
import { useFetchCandidatesByPollIdQuery } from '../redux/services/pollApi'; // Ensure correct import path
import { usePostVoteMutation } from '../redux/services/votecastApi';
import { jwtDecode } from 'jwt-decode'; // Correct import statement

function CandidateList({ pollId, electionId }) {
    const { data: candidates = [], isLoading, error } = useFetchCandidatesByPollIdQuery(pollId);
    const [postVote] = usePostVoteMutation();
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [message, setMessage] = useState('');

    // Extract userId from the token and set it in session storage
    useEffect(() => {
        const checkToken = () => {
            const token = sessionStorage.getItem('Token'); 
            console.log("Token from sessionStorage:", token); 
    
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    console.log("Decoded token:", decoded); 
    
                    const id = decoded.UserId || decoded.userId; 
                    if (id) {
                        sessionStorage.setItem('userId', id); 
                    } else {
                        console.error("UserId not found in decoded token", decoded);
                    }
                } catch (err) {
                    console.error("Failed to decode token:", err);
                }
            } else {
                console.error("No token found in sessionStorage");
            }
        };
    
        checkToken();
    
        // Optionally, you could set up an interval to keep checking for the token if it might take time to appear
        const intervalId = setInterval(() => {
            if (!sessionStorage.getItem('userId')) {
                checkToken();
            } else {
                clearInterval(intervalId);
            }
        }, 1000);
    
        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, []);
    

    const handleCandidateSelect = (id) => {
        setSelectedCandidate(id);
    };

    const handleVote = async () => {
        const storedUserId = sessionStorage.getItem('userId');
        if (!storedUserId) {
            console.error("UserId is not set in sessionStorage.");
            setMessage('UserId is not available. Please log in again.');
            return;
        }
    
        // Convert userId from string to integer
        const userId = parseInt(storedUserId, 10);
    
        const voteData = { userId, candidateId: selectedCandidate, pollId, electionId };
        console.log("Vote data being sent:", voteData); // Debugging line
    
        try {
            const result = await postVote(voteData).unwrap();
            setMessage(result.message || 'Vote cast successfully!');
        } catch (error) {
            console.error("Error casting vote:", error); // Log the entire error object
            const errorMessage = error.data?.message || error.message || 'An unexpected error occurred';
            setMessage('Error casting vote: ' + errorMessage);
        }
    };
    

    if (isLoading) return <p>Loading Candidates...</p>;
    if (error) return <p>Error loading candidates: {error.message}</p>;

    return (
        <div>
            <h4>Candidates for Poll {pollId}</h4>
            <ul className="list-group">
                {candidates.map((candidate) => (
                    <li
                        key={candidate.id}
                        className="list-group-item"
                        onClick={() => handleCandidateSelect(candidate.id)}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: selectedCandidate === candidate.id ? '#d3d3d3' : 'transparent',
                        }}
                    >
                        {candidate.name}
                    </li>
                ))}
            </ul>

            <button onClick={handleVote} disabled={!selectedCandidate} className="btn btn-primary mt-3">
                Cast Vote
            </button>

            {message && <p>{message}</p>}
        </div>
    );
}

export default CandidateList;
