import { readFileSync } from "fs";

const file = readFileSync("./2/input.txt", "utf-8").split("\n");

const game = file.map((l, i) => {
  l = l.replace(/Game \d+: /g, "");
  const turns = l.split("; ").map((t) =>
    t.split(", ").map((c) => {
      c = c.trim().split(/\s+/);
      return {
        [c[1]]: parseInt(c[0]),
      };
    })
  );
  return {
    id: i + 1,
    turns,
  };
});

const part1 = game.reduce((acc, curr) => {
    let addId = true;
    curr.turns.forEach((turn) => {
      turn.forEach((c) => {
        if (c?.red > 12 || c?.green > 13 || c?.blue > 14) {
          addId = false;
        }
      });
    });
    return addId ? acc + curr.id : acc;
  }, 0);

const part2 = game.reduce((acc, curr)=>{
  const highestColour = {
    red:0, 
    blue:0, 
    green:0, 
  }
  const c = curr.turns.forEach(t=>{
    t.forEach((c)=>{
      if (c?.red > highestColour.red || c?.green > highestColour.green || c?.blue > highestColour.blue){
        highestColour[Object.keys(c)[0]] = c[Object.keys(c)[0]]
      }
    })
  })
  return acc + (highestColour.red * highestColour.green * highestColour.blue)
}, 0)
console.log(part2)