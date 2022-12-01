import memoize from './helpers/memoize.ts';

let calls = 0;
function double (x: number): number {
    calls += 1;
    return x * 2;
}

const memoTest = memoize(double);
const result1 = memoTest(2);

console.log(JSON.stringify({ result1, calls }, null, 2));