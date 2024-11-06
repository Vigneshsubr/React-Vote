import React from 'react';
import { useFetchPollsByElectionIdQuery } from '../redux/services/electionApi';
import CandidateList from '../pages/CandidateList';

function PollList({ electionId }) {
    const { data: polls = [], isLoading, error } = useFetchPollsByElectionIdQuery(electionId);
    const [selectedPoll, setSelectedPoll] = React.useState(null);

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
                        onClick={() => setSelectedPoll(poll.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        {poll.pollName}
                    </li>
                ))}
            </ul>

            {selectedPoll && <CandidateList pollId={selectedPoll} electionId={electionId} />}
        </div>
    );
}

export default PollList;
