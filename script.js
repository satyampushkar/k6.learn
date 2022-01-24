import http from 'k6/http';
import { sleep } from 'k6';
// import { htmlReport } from “https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
// import { textSummary } from “https://jslib.k6.io/k6-summary/0.0.1/index.js";
export let options = {
duration: '10s',
vus: 50,
thresholds: {
http_req_duration: ['avg < 120']
}
};
export default function() {
http.get('http://host.docker.internal:5079/WeatherForecast');
sleep(1);
};
// export function handleSummary(data) {
// return {
// “scriptReport.html”: htmlReport(data),
// stdout: textSummary(data, { indent: “ “, enableColors: true })
// };
// }