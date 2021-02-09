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
];

export function getAiMove(): Cell {
  const i = Math.round(Math.random() * 10);
  const j = Math.round(Math.random() * 10);
  return [i, j];
}

export function putPlayerMove(cell: Cell) {
  if (grid[cell[0]][cell[1]]) return true;
  return false;
}
