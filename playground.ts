import { getStopByCode, getLineByCode, getStopTimesByStopCode } from '.';

const [stop, line, times] = await Promise.all([
    getStopByCode('6_2711'),
    getLineByCode('6__15___'),
    getStopTimesByStopCode('6_2711')
]);

console.log('Stop:', stop);
console.log('Line:', line);
console.log('Stop Times:', times);
