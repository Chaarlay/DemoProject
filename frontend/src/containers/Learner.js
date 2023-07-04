import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { useParams, Link } from 'react-router-dom';
import withAPI from '../services/api';

import logo from '../static/logo.svg';
import '../App.css';


const Learner = ({ api }) => {

  const params = useParams();
  const modelFields = [
    'id', 'first_name', 'last_name', 'grade', 'classbatch'
  ]

  const [learnerResult, setLearnerResult] = useState(null);

  const fetchInfo = () => {
    setLearnerResult(null);
    api
      .fetchLearner(params.learnerId)
      .then((res) => {
        console.log("Received Learner:",res);
        setLearnerResult(res);
      })
      .catch((e) => {
        console.log("Error fetching Learner: ",e);
        setLearnerResult('No results found...');
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="App">
      <div>
        <p>
          Learner info:
        </p>
      </div>
      <div>
        {learnerResult && learnerResult.id && (
          modelFields.map((field) => (
            <div>
              {field + ": " + learnerResult[field]}
            </div>
          ))
        )}
        {learnerResult && !learnerResult.id && (
          <p>
            No Learner found with this id...
          </p>
        )}
      </div>
    </div>
  );
}

export default compose(
  withAPI
)(Learner);
