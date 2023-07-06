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
  ];
 //When setClassBatchResult is called, and given a param, the classBatchrResult value will update that what was passed in
  //and re render the screen with that new value
  const [classbatchResult, setClassBatchResult] = useState(null);
    // Added inputValue state to track the value of the input field
  const [inputValue, setInputValue] = useState('');

  const fetchInfo = () => {
    //First, set class batch result to null (empty), then make an api call to fetchClassBatch, passing in the classbatchId,
    //to retrieve that certain class batch, then once we recieve a response, if not an error, setClassBatchResult to that response
    setClassBatchResult(null);
    api
      .fetchClassBatch(params.classbatchId)
      //then waits for the response of the api call and then sets new class batch result
      .then((res) => {
        console.log("Received ClassBatch:", res);
      //updates the use state to res instead of null
        setClassBatchResult(res);
      })
      .catch((e) => {
        console.log("Error fetching ClassBatch: ", e);
        setClassBatchResult('No results found...');
      });
  };
  //on first render call fetch info to get the data

  useEffect(() => {
    fetchInfo();
  }, []);
  
 // this function handles the click of the button after a new name is typed
  //it sets x to the element that has the id cbname (line 72), then, we make an API call to updateClassBatch, where we pass in an obj
  //containing the id and name, name being the value that we just entered
  
  const handleChange = () => {
    let x = document.getElementById("cbname");
    api
      .updateClassBatch({ "id": x.getAttribute("batch_id"), "name": x.value })
      .then((res) => {
        setClassBatchResult(res);
      })
  };

  // Update the inputValue state when the input value changes
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
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
            <div key={field}>
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
          {/* On change, this input box will update the inputValue state */}
          <input
            id="cbname"
            name="classbatch_name"
            batch_id={classbatchResult.id}
            value={inputValue}
            onChange={handleInputChange}
          />
          {/* When the button is clicked, it will call handleChange function */}
          {/* Set the button to disabled if the inputValue is blank */}
          <button
            type="button"
            onClick={handleChange}
            disabled={!inputValue.trim()}
          >
            change name
          </button>
        </div>
      }
    </div>
  );
};

export default compose(
  withAPI
)(ClassBatch);
