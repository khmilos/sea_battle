import { Cell } from '../data';

export const NEW_SHIP = 'NEW_SHIP';
export const EXPAND_SHIP = 'EXPAND_SHIP';
export const REMOVE_SHIP = 'REMOVE_SHIP';
export const SHRINK_SHIP = 'SHRINK_SHIP';
export const MERGE_SHIPS = 'MERGE_SHIPS';
export const CLEAR_SHIPS = 'CLEAR_SHIPS';

export type NewShip = {
  type: typeof NEW_SHIP,
  payload: {
    cell: Cell,
  },
};

export type ExpandShip = {
  type: typeof EXPAND_SHIP,
  payload: {
    index: number,
    cell: Cell,
  },
};

export type RemoveShip = {
  type: typeof REMOVE_SHIP,
  payload: {
    index: number,
  },
};

export type SplitShip = {
  type: typeof SHRINK_SHIP,
  payload: {
    shipIndex: number,
    cellIndex: number,
  },
};

export type MergeShips = {
  type: typeof MERGE_SHIPS,
  payload: {
    indices: number[],
    cell: Cell,
  },
};

export type ClearShips = {
  type: typeof CLEAR_SHIPS,
};
