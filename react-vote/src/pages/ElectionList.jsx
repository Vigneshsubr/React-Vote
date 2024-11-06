import React from 'react';
import { useGetElectionQuery } from '../redux/services/electionApi';
import { useNavigate } from 'react-router-dom';

function ElectionList() {
    const { data: elections = [], isLoading, error } = useGetElectionQuery();
    const navigate = useNavigate();

    if (isLoading) return <p>Loading Elections...</p>;
    if (error) return <p>Error loading elections</p>;

    return (
        <div>
            <h2>Available Elections</h2>
            <ul className="list-group">
                {elections.map((election) => (
                    <li
                        key={election.id}
                        className="list-group-item"
                        onClick={() => navigate(`/polls/${election.id}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        {election.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ElectionList;
