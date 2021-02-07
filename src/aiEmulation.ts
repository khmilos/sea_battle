import { Cell } from 'context/types';

const grid = [
  [1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 0],

  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 1, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

  [0, 1, 0, 1, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

export function makeMove(): Cell {
  let i = Math.round(Math.random() * 10);
  let j = Math.round(Math.random() * 10);
  return [i, j]
}

export function acceptMove(cell: Cell) {
  if (grid[cell[0]][cell[1]]) return true;
  return false;
}
