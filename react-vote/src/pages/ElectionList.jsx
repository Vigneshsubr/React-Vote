import React from 'react';
import { useGetElectionQuery } from '../redux/services/electionApi';
import PollList from '../pages/PollList';

function ElectionList() {
    const { data: elections = [], isLoading, error } = useGetElectionQuery();
    const [selectedElection, setSelectedElection] = React.useState(null);

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
                        onClick={() => setSelectedElection(election.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        {election.name}
                    </li>
                ))}
            </ul>

            {selectedElection && <PollList electionId={selectedElection} />}
        </div>
    );
}

export default ElectionList;
