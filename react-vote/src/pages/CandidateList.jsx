import React, { useEffect, useState } from 'react';
import { useFetchCandidatesByPollIdQuery } from '../redux/services/pollApi';
import { usePostVoteMutation } from '../redux/services/votecastApi';
import { useParams } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Card from '../components/Card';

function CandidateList() {
    const { pollId, electionId } = useParams();
    const { data: candidates = [], isLoading, error } = useFetchCandidatesByPollIdQuery(pollId);
    const [postVote] = usePostVoteMutation();
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('Token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                sessionStorage.setItem('userId', decoded.UserId || decoded.userId);
            } catch (error) {
                console.error("Failed to decode token:", error);
            }
        }
    }, []);

    const handleVote = async () => {
        const userId = parseInt(sessionStorage.getItem('userId'), 10);
        const voteData = { userId, candidateId: selectedCandidate, pollId, electionId };

        try {
            const result = await postVote(voteData).unwrap();
            setMessage(result.message || 'Vote cast successfully!');
        } catch (error) {
            const errorMessage = error.data?.message || error.message || 'An unexpected error occurred';
            setMessage('Error casting vote: ' + errorMessage);
        }
    };

    if (isLoading) return <p>Loading Candidates...</p>;
    if (error) return <p>Error loading candidates: {error.message}</p>;

    return (
        <div>
            <h4>Candidates for Poll {pollId}</h4>
            <div className="candidate-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {candidates.map((candidate) => (
                    <Card
                        key={candidate.id}
                        image={`data:image/jpeg;base64,${candidate.profileImage}`}
                        className="candidate-card"
                    >
                        <input
                            type="radio"
                            id={`candidate-${candidate.id}`}
                            name="candidate"
                            value={candidate.id}
                            checked={selectedCandidate === candidate.id}
                            onChange={() => setSelectedCandidate(candidate.id)}
                            style={{ marginRight: '10px' }}
                        />
                        <label htmlFor={`candidate-${candidate.id}`}>
                            {candidate.name}
                        </label>
                    </Card>
                ))}
            </div>

            <button
                onClick={handleVote}
                disabled={!selectedCandidate}
                className="btn btn-primary mt-3"
            >
                Cast Vote
            </button>

            {message && <p>{message}</p>}
        </div>
    );
}

export default CandidateList;
