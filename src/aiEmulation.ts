import { Cell } from 'context/types';

export function makeMove(): Cell {
  let i = Math.round(Math.random() * 10);
  let j = Math.round(Math.random() * 10);
  return [i, j]
}
