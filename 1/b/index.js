// Returns content of the input file as string
function getRawInput(path) {

    // Module for file read
    const fs = require('fs');

    return fs.readFileSync(path).toString();
}

// Returns input as array of sorted similarity values
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

    const similarityArray = [];

    for (const leftElem of leftArray) {
        
        const similarityValue = leftElem * rightArray.filter((rightElem) => rightElem === leftElem).length;
        similarityArray.push(similarityValue);
    }

    return similarityArray;
}

function calcDistance(similarityArray) {

    return similarityArray.reduce((a, b) => a + b);
}

// Outputs calculated distance
function outputDistance(distance) {

    console.log(distance);
}

// Path to the input file
const inputPath = './input.txt';
const rawInput = getRawInput(inputPath);
const similarityArray = getFormattedInput(rawInput);
const distance = calcDistance(similarityArray);
outputDistance(distance);