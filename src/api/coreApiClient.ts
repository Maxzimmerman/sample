import axios from 'axios';

const coreApiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL ?? '/api',
    timeout: 10_000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default coreApiClient;
