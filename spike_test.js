import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages:[
        { duration: '10s', target: 100 }, // below normal load
        { duration: '1m', target: 100 },
        { duration: '10s', target: 1400 }, // spike to 1400 users
        { duration: '3m', target: 1400 }, // stay at 1400 for 3 minutes
        { duration: '10s', target: 100 }, //Scale down. Recovery stage.
        { duration: '3m', target: 100 },
        { duration: '10s', target: 0 }, 
    ],
};

const API_BASE_URL = 'https://host.docker.internal:7046';

export default () => {

    http.batch([
        ['GET', `${API_BASE_URL}/weatherforecast`],
        ['GET', `${API_BASE_URL}/swagger`],
    ]);
    
    sleep(1);
};