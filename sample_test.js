import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    vus: 1,
    duration: '10s'
};

export default () => {
    http.get('https://host.docker.internal:7046/weatherforecast');
    //http.get('http://host.docker.internal:5079/WeatherForecast');
    sleep(1);
};