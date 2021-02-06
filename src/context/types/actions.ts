import { Cell } from './state';

interface Action {
  type: string;
}

// Ship placement actions
export const NEW_SHIP = 'NEW_SHIP';
export const EXPAND_SHIP = 'EXPAND_SHIP';
export const REMOVE_SHIP = 'REMOVE_SHIP';
export const SHRINK_SHIP = 'SHRINK_SHIP';
export const MERGE_SHIPS = 'MERGE_SHIPS';
export const CLEAR_SHIPS = 'CLEAR_SHIPS';

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
    indices: number[];
    cell: Cell;
  };
}

interface ClearShipsAction extends Action {
  type: typeof CLEAR_SHIPS;
}

// Stage change action
export const PLAYER_READY = 'PLAYER_READY';

interface PlayerReadyAction extends Action {
  type: typeof PLAYER_READY;
}

// Moves
export const PLAYER_MOVE = 'PLAYER_MOVE';
export const OPPONENT_MOVE = 'OPPONENT_MOVE';

interface PlayerMoveAction {
  type: typeof PLAYER_MOVE;
  payload: {
    cell: Cell;
  };
}

interface OpponentMoveAction {
  type: typeof OPPONENT_MOVE;
  payload: {
    cell: Cell;
  };
}

export type ContextActionType = NewShipAction
  | ExpandShipAction
  | RemoveShipAction
  | SplitShipAction
  | MergeShipsAction
  | ClearShipsAction
  | PlayerReadyAction
  | PlayerMoveAction
  | OpponentMoveAction;
