import React from 'react';
import { useFetchPollsByElectionIdQuery } from '../redux/services/electionApi';
import { useNavigate, useParams } from 'react-router-dom';

function PollList() {
    const { electionId } = useParams();
    const { data: polls = [], isLoading, error } = useFetchPollsByElectionIdQuery(electionId);
    const navigate = useNavigate();

    if (isLoading) return <p>Loading Polls...</p>;
    if (error) return <p>Error loading polls</p>;

    return (
        <div>
            <h3>Polls for Election {electionId}</h3>
            <ul className="list-group">
                {polls.map((poll) => (
                    <li
                        key={poll.id}
                        className="list-group-item"
                        onClick={() => navigate(`/dashboard/candidates/${poll.id}/${electionId}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        {poll.pollName}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PollList;
