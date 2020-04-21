// Get server url from env vars or fallback to localhost
const serverUrl = process.env.SERVER_URL || 'http://localhost:1337';

export { serverUrl };
