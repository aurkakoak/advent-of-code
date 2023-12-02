import { readFileSync } from "fs";

const file = readFileSync("./input.txt", "utf-8")
  .replace(/one/gi, "o1e")
  .replace(/two/gi, "t2o")
  .replace(/three/gi, "t3e")
  .replace(/four/gi, "r4e")
  .replace(/five/gi, "f5w")
  .replace(/six/gi, "r6r")
  .replace(/seven/gi, "y7e")
  .replace(/eight/gi, "e8r")
  .replace(/nine/gi, "p9n")
  .split("\n");

const allNumbers = [];

for (const line of file) {
  const numbers = [];
  for (const character of line) {
    if (!isNaN(parseInt(character))) {
      numbers.push(parseInt(character));
    }
  }
  allNumbers.push(parseInt(`${numbers[0]}${numbers[numbers.length - 1]}`));
}

console.log(allNumbers.reduce((acc, curr) => acc + curr));
