export type Cell = [number, number];

export type Ship = Cell[];

export interface GameGridState {
  shipList: Ship[];
  missList: Cell[];
  hitList: Cell[];
}

export interface ContextState {
  playerGrid: GameGridState;
}

export type ContextDispatch = (action: ContextActionType) => void;

export interface ContextValue {
  state: ContextState;
  dispatch: ContextDispatch;
}

export const NEW_SHIP = 'NEW_SHIP';
export const EXPAND_SHIP = 'EXPAND_SHIP';
export const REMOVE_SHIP = 'REMOVE_SHIP';
export const SHRINK_SHIP = 'SHRINK_SHIP';
export const MERGE_SHIPS = 'MERGE_SHIPS';
export const CLEAR_SHIPS = 'CLEAR_SHIPS';

interface Action {
  type: string;
}

interface NewShipAction extends Action {
  type: typeof NEW_SHIP;
  payload: {
    cell: Cell;
  };
}

interface ExpandShipAction extends Action {
  type: typeof EXPAND_SHIP;
  payload: {
    index: number;
    cell: Cell;
  };
}

interface RemoveShipAction extends Action {
  type: typeof REMOVE_SHIP;
  payload: {
    index: number;
  };
}

interface SplitShipAction extends Action {
  type: typeof SHRINK_SHIP;
  payload: {
    shipIndex: number;
    cellIndex: number;
  };
}

interface MergeShipsAction extends Action {
  type: typeof MERGE_SHIPS;
  payload: {
    indices: [number, number];
    cell: Cell;
  };
}

interface ClearShipsAction extends Action {
  type: typeof CLEAR_SHIPS;
}

export type ContextActionType = NewShipAction
  | ExpandShipAction
  | RemoveShipAction
  | SplitShipAction
  | MergeShipsAction
  | ClearShipsAction;
