import React, { useEffect, useState } from 'react';
import { useFetchCandidatesByPollIdQuery } from '../redux/services/pollApi';
import { usePostVoteMutation } from '../redux/services/votecastApi';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const CandidateList = () => {
    const { pollId, electionId } = useParams();
    const navigate = useNavigate();
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

    const handleBack = () => {
        navigate(-1); // Navigate back
    };

    if (isLoading) return <p>Loading Candidates...</p>;
    if (error) return <p>Error loading candidates: {error.message}</p>;

    return (
        <div className="container mt-4" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
            {/* Header Section with Back Arrow */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="me-2"
                        size="lg"
                        style={{ cursor: 'pointer', color: 'black' }}
                        onClick={handleBack}
                    />
                    <h4 className="fst-italic">Candidates for Poll {pollId}</h4>
                </div>
            </div>

            {/* Candidate List as Cards */}
            <div className="row justify-content-center g-4">
                {candidates.map((candidate) => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={candidate.id}>
                        <div className="card h-100 shadow-sm" style={{ maxWidth: '250px', margin: '0 auto' }}>
                            <img
                                src={`data:image/jpeg;base64,${candidate.profileImage}`}
                                className="card-img-top"
                                alt={candidate.name}
                                style={{
                                    height: '200px',
                                    objectFit: 'cover',
                                    borderRadius: '8px 8px 0 0',
                                }}
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">{candidate.name}</h5>
                                <p className="card-text">Candidate ID: {candidate.id}</p>
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
                                    Select {candidate.name}
                                </label>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Vote Button */}
            <div className="text-center mt-4">
                <button
                    onClick={handleVote}
                    disabled={!selectedCandidate}
                    className="btn btn-primary"
                >
                    Cast Vote
                </button>
            </div>

            {/* Message */}
            {message && <p className="text-center mt-3 text-success">{message}</p>}
        </div>
    );
};

export default CandidateList;
