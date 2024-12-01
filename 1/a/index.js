// Returns content of the input file as string
function getRawInput(path) {

    // Module for file read
    const fs = require('fs');

    return fs.readFileSync(path).toString();
}

// Returns input as array of sorted left and right ID's (numeric)
function getFormattedInput(content) {

    const valueSeparator = '   ';

    const EOL = require('os').EOL;
    const lines = content.split(EOL);

    const leftArray = [];
    const rightArray = [];

    for (const line of lines) {
        
        const values = line.split(valueSeparator);

        const firstValue = Number.parseInt(values[0], 10)
        const secondValue = Number.parseInt(values[1], 10)

        leftArray.push(firstValue);
        rightArray.push(secondValue);
    }

    leftArray.sort();
    rightArray.sort();

    return {
        leftArray,
        rightArray
    };
}

// Returns sum of distance between left and right location ID's assuming that arrays
// are sorted from lowest to largest value and that they contain same amount of elements
function calcDistance(leftArray, rightArray) {

    let sum = 0;

    for (let i = 0; i < leftArray.length; i++) {
        const leftArrayElem = leftArray[i];
        const rightArrayElem = rightArray[i];
        
        sum += Math.abs(rightArrayElem - leftArrayElem);
    }

    return sum;
}

// Outputs calculated distance
function outputDistance(distance) {

    console.log(distance);
}

// Path to the input file
const inputPath = './input.txt';
const rawInput = getRawInput(inputPath);
const formattedInput = getFormattedInput(rawInput);
const distance = calcDistance(formattedInput.leftArray, formattedInput.rightArray);
outputDistance(distance);