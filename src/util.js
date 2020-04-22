// Get server url from env vars or fallback to localhost
const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:1337';
console.log(serverUrl);

export { serverUrl };
