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
export const PLAYER_MADE_MOVE = 'PLAYER_MADE_MOVE';
export const PLAYER_MOVE_RESPONSE = 'PLAYER_MOVE_RESPONSE';
export const OPPONENT_MADE_MOVE = 'OPPONENT_MADE_MOVE';

interface PlayerMadeMoveAction {
  type: typeof PLAYER_MADE_MOVE;
  payload: {
    cell: Cell;
  };
}

interface PlayerMoveResponseAction {
  type: typeof PLAYER_MOVE_RESPONSE;
  payload: {
    isHit: boolean;
  };
}

interface OpponentMadeMoveAction {
  type: typeof OPPONENT_MADE_MOVE;
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
  | PlayerMadeMoveAction
  | PlayerMoveResponseAction
  | OpponentMadeMoveAction;
