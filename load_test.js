import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages:[
        { duration: '15m', target: 100 }, // stimulate ramp up of traffic from 1 to 100 users over 5 minutes.
        { duration: '10m', target: 100 }, // stay at 100 users for 10 minutes
        { duration: '5m', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
        http_req_direction: ['p(99)<150'], // 99% of requests must complete below 150ms
    }
};

const API_BASE_URL = 'https://host.docker.internal:7046';

export default () => {

    http.batch([
        ['GET', `${API_BASE_URL}/weatherforecast`],
        ['GET', `${API_BASE_URL}/swagger`],
    ]);
    
    sleep(1);
};