import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages:[
        { duration: '12m', target: 400 }, // ramp up to 400 users
        { duration: '1h30m', target: 400 }, // stay at 400 for 2 hours
        { duration: '2m', target: 0 } // scale down (optional)
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