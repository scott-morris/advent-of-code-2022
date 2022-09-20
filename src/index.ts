import isNumber from './helpers/is-number'

console.log('Hello, World!');

const input: string = '9134437236318171116117288148911191769789149391998581842118486728495315197918969961726641911197278519'
const test: number = Number(input);

console.log({test, isNumber: isNumber(test)});