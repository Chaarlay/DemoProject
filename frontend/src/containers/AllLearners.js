import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { useParams, Link } from 'react-router-dom';
import withAPI from '../services/api';

import logo from '../static/logo.svg';
import '../App.css';


const AllLearners = ({ api }) => {

    const params = useParams();
    const modelFields = [
        'id', 'first_name', 'last_name', 'grade', 'classbatch'
    ]

    const [learnerResults, setLearnerResults] = useState(null);

    const fetchInfo = () => {
        setLearnerResults(null);
        api
            .fetchAllLearners()
            .then((res) => {
                console.log("Received Learners:", res);
                setLearnerResults(res);
            })
            .catch((e) => {
                console.log("Error fetching Learners: ", e);
                setLearnerResults('No results found...');
            });
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <div className="App">
            <div>
                <p>
                    Learners info:
                </p>
            </div>
            <div>
                {learnerResults && (learnerResults.map((learner) => (
                    <div>
                        {learner['id'] + ": " + learner['last_name'] + ', ' + learner['first_name'] }
                    </div>
                )))}
            </div>
        </div>
    );
}

export default compose(
    withAPI
)(AllLearners);