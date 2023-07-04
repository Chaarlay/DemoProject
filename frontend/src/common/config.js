let apiUrl = process.env.REACT_APP_API_URL;

const usingHTTPS = window.location.protocol === 'https:';
if (!usingHTTPS) {
  apiUrl = apiUrl.replace("https", "http");
}

export default {
  apiUrl: apiUrl,
}
