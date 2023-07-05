import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { useParams, Link } from 'react-router-dom';
import withAPI from '../services/api';

import logo from '../static/logo.svg';
import '../App.css';


const ClassBatch = ({ api }) => {

  const params = useParams();
  const modelFields = [
    'id', 'name', 'instructor'
  ]

  const [classbatchResult, setClassBatchResult] = useState(null);

  const fetchInfo = () => {
    setClassBatchResult(null);
    api
      .fetchClassBatch(params.classbatchId)
      .then((res) => {
        console.log("Received ClassBatch:", res);
        setClassBatchResult(res);
      })
      .catch((e) => {
        console.log("Error fetching ClassBatch: ", e);
        setClassBatchResult('No results found...');
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleChange = () => {
    let x = document.getElementById("cbname");
    api
      .updateClassBatch({ "id": x.getAttribute("batch_id"), "name": x.value })
      .then((res) => {
        setClassBatchResult(res);
      })

  };

  return (
    <div className="App">
      <div>
        <p>
          ClassBatch info:
        </p>
      </div>
      <div>
        {classbatchResult && classbatchResult.id && (
          modelFields.map((field) => (
            <div>
              {field + ': ' + classbatchResult[field]}
            </div>
          ))
        )}
        {classbatchResult && !classbatchResult.id && (
          <p>
            No ClassBatch found with this id...
          </p>
        )}
      </div>
      {classbatchResult &&
        <div>
          <input id="cbname" name="classbatch_name" batch_id={classbatchResult.id}></input>
          <button type="button" onClick={handleChange}>change name</button>
        </div>}
    </div>
  );
}

export default compose(
  withAPI
)(ClassBatch);