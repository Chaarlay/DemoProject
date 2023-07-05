import { connect } from 'react-redux';
import { compose } from 'redux';

import { fetchWithError } from './http';
import config from '../common/config';

var requestID = 0;
//const mapStateToProps = (state, ownProps?) => ({
//  token: state.auth.token,
//  user: state.auth.user
//)}

const apiFactory = (token, user) => {
  const getData = () => {
    return {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  }

  const patchData = (params) => {
    return {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }
  }

  const api = {
    fetchLearner: (lid) => {
      return fetchWithError(`${config.apiUrl}/rosters/learner/${lid}/`, getData());
    },
    fetchClassBatch: (cbid) => {
      return fetchWithError(`${config.apiUrl}/rosters/classbatch/${cbid}/`, getData());
    },
    fetchAllLearners: () => {
      return fetchWithError(`${config.apiUrl}/rosters/learners/`, getData());
    } ,
    updateClassBatch: (params) => {
      console.log(params);
      return fetchWithError(`${config.apiUrl}/rosters/classbatches/${params.id}/`, patchData(params));
    }
  }

  return api;
}

const withAPI = (wrappedComponent) => {
  return ({ token, user, ...rest }) => {
    const api = apiFactory(token, user);
    return wrappedComponent({ api, token, user, ...rest });
  }
}

export default compose(
  //connect(mapStateToProps),
  withAPI
);