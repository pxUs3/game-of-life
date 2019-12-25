/// <reference lib="webworker" />

const directions: number[][] = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1]
];

addEventListener('message', ({ data }) => {
  recalucalteBoard(data);
  postMessage(data);
});

function recalucalteBoard(table: number[][]) {
  for (let vi = 0; vi < table.length; vi++) {
    const line = table[vi];
    for (let hi = 0; hi < line.length; hi++) {
      const currentElement = table[vi][hi];
      const neighbours = countNeighbours(table, hi, vi);
      if (currentElement === 1) {
        if (neighbours < 2) {
          table[vi][hi] = 0;
        }
        if (neighbours > 3) {
          table[vi][hi] = 0;
        }
      }
      if (currentElement === 0 && neighbours === 3) {
        table[vi][hi] = 1;
      }
    }
  }
}

function countNeighbours(table: number[][], hi: number, vi: number) {
  let neighbours = 0;

  directions.forEach(d => {
    try {
      const directedHI = hi + d[0];
      const directedVI = vi + d[1];
      const n = table[directedVI][directedHI];
      if (n === 1) {
        neighbours++;
      }
    } catch (e) { }
  });
  return neighbours;
}

