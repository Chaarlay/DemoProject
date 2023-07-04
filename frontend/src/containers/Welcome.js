import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import withAPI from '../services/api';

import logo from '../static/logo.svg';
import '../App.css';

const Welcome = ({ api }) => {

  const [learnerSearchText, setLearnerSearchText] = useState(null);
  const [learnerResult, setLearnerResult] = useState(null);
  const [classbatchSearchText, setClassBatchSearchText] = useState(null);
  const [classbatchResult, setClassBatchResult] = useState(null);

  const learnerSearch = (text) => {
    setLearnerResult(null);
    api
      .fetchLearner(text)
      .then((res) => {
        console.log("Received Learner:",res);
        setLearnerResult(res);
      })
      .catch((e) => {
        console.log("Error fetching Learner: ",e);
        setLearnerResult('No results found...');
      });
  }
  const classbatchSearch = (text) => {
    setClassBatchResult(null);
    api
      .fetchClassBatch(text)
      .then((res) => {
        console.log("Received ClassBatch:",res);
        setClassBatchResult(res);
      })
      .catch((e) => {
        console.log("Error fetching ClassBatch: ",e);
        setClassBatchResult('No results found...');
      });
  }

  return (
    <div className="App">
      <div>
        <p>
          Find Learner by id
        </p>
      </div>
      <div>
        <input
          type="text"
          onChange={(e) => setLearnerSearchText(e.target.value)}
          value={learnerSearchText}
        />
        <button
          onClick={() => learnerSearch(learnerSearchText)}
        >
          Search
        </button>
      </div>
      <div>
        {learnerResult && learnerResult.id && (
          <React.Fragment>
            <p>
              {"Results:"}
            </p>
            <div>
              <p>
                {"Learner "+learnerResult.id+": "}
                <Link
                  to={{
                    pathname: `/learner/${learnerResult.id}`,
                  }}
                >
                  {learnerResult.first_name} {learnerResult.last_name}
                </Link>
              </p>
            </div>
          </React.Fragment>
        )}
        {learnerResult && !learnerResult.id && (
          <p>
            No results found...
          </p>
        )}
      </div>

      <div><p>OR</p></div>

      <div>
        <p>
          Find ClassBatch by id
        </p>
      </div>
      <div>
        <input
          type="text"
          onChange={(e) => setClassBatchSearchText(e.target.value)}
          value={classbatchSearchText}
        />
        <button
          onClick={() => classbatchSearch(classbatchSearchText)}
        >
          Search
        </button>
      </div>
      <div>
        {classbatchResult && classbatchResult.id && (
          <React.Fragment>
            <p>
              {"Results:"}
            </p>
            <div>
              <p>
                {"ClassBatch "+classbatchResult.id+": "}
                <Link
                  to={{
                    pathname: `/classbatch/${classbatchResult.id}`,
                  }}
                >
                  {classbatchResult.name}
                </Link>
              </p>
            </div>
          </React.Fragment>
        )}
        {classbatchResult && !classbatchResult.id && (
          <p>
            No results found...
          </p>
        )}
      </div>
    </div>
  );
}

export default compose(
  withAPI
)(Welcome);
