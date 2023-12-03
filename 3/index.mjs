import { readFileSync } from "fs";

const schematic = readFileSync("./3/input.txt", "utf-8")
  .split("\n")
  .map((l) => l.split(""));

const isDigitRegex = /\b[0-9]\b/;

const numbers = [];

for (const [lineIndex, letters] of schematic.entries()) {
  for (const [letterIndex, letter] of letters.entries()) {
    if (!letter.match(isDigitRegex)) {
      continue;
    }

    //check is first number
    if (
      letterIndex > 0 &&
      schematic[lineIndex][letterIndex - 1].match(isDigitRegex)
    ) {
      continue;
    }

    //found a first number, let's get the full thing
    let number = [];
    let hasAdjacentSymbol = false;
    const adjacents = [];

    function seekNumber(currentOffset) {
      const current = letters[letterIndex + currentOffset];
      const next = letters[letterIndex + currentOffset + 1];
    
      if (current === undefined) {
        return;
      }
    
      if (current.match(isDigitRegex)) {
        number.push(current);
    
        // Check adjacents
        for (let i = -1; i <= 1; i++) {
          if (lineIndex + i >= 0 && lineIndex + i < schematic.length) {
            adjacents.push(
              schematic[lineIndex + i].slice(
                letterIndex + currentOffset - 1,
                letterIndex + currentOffset + 2
              )
            );
          }
        }
      }
    
      if (next === undefined || !next.match(isDigitRegex)) {
        return number;
      }
    
      seekNumber(currentOffset + 1);
    }
    seekNumber(0);    

    if (
      adjacents.flat().some((element) => {
        return !element.match(/^[0-9\.]$/);
      })
    ) {
      numbers.push(parseInt(number.join("")));
    }
  }
}
console.log(JSON.stringify(numbers))
console.log(numbers.reduce((curr, acc) => curr + acc));
