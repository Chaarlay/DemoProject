const resolveWithFull = (resp) => {
  return new Promise((resolve, reject) => {
    resp.json().then((resp_json) => {
      return resolve([resp, resp_json])
    }).catch((e) => {
      reject(e);
    })
  })
}

const handleErr = ([resp, resp_json]) => {
  if (!resp.ok) {
    let err = resp_json.message || 'Something went wrong.'
    if (resp_json.error) {
      err = resp_json.error;
    }
    throw new Error(err);
  }

  return [resp, resp_json];
}

const fetchWithError = (...rest) => {
  return fetch(...rest)
    .then(resolveWithFull)
    .then(handleErr)
    .then(([resp, resp_json]) => resp_json)
    .catch((e) => {
      console.log(e);
      //throw new Error(e);
      throw e;
    })
}

export { resolveWithFull, handleErr, fetchWithError };
