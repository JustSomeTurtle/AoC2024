// Returns content of the input file as string
function getRawInput(path) {

    // Module for file read
    const fs = require('fs');

    return fs.readFileSync(path).toString();
}

function getSafeReportAmount(content) {

    let safeReports = 0;

    const valueSeparator = ' ';

    const EOL = require('os').EOL;
    const lines = content.split(EOL);

    for (const line of lines) {
        
        const values = line.split(valueSeparator).map((v) => Number(v));

        let prevValue = null;
        let ascending = null;

        let noBreak = true;

        for (const val of values) {
            
            if (prevValue) {
                
                if (ascending === null) {

                    ascending = prevValue < val;
                }
                
                if (ascending && (val - prevValue > 3 || val - prevValue < 1)) {
                    noBreak = false;
                    break;
                }

                if (ascending === false && (prevValue - val > 3 || prevValue - val < 1)) {
                    noBreak = false;
                    break;
                }
            }

            prevValue = val;
        }

        if (noBreak) {
            safeReports++;
        }
    }

    return safeReports;
}

// Outputs calculated distance
function outputSafeReports(safeReports) {

    console.log(safeReports);
}

// Path to the input file
const inputPath = './input.txt';
const rawInput = getRawInput(inputPath);
const safeReports = getSafeReportAmount(rawInput);
outputSafeReports(safeReports);