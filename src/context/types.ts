export type Cell = [number, number];

export type Ship = Cell[];

export interface GameGridState {
  shipList: Ship[];
  missList: Cell[];
  hitList: Cell[];
}

export type GridKey = 'playerGrid' | 'opponentGrid';

export enum GameStage {
  ShipsPlacement,
  WaitingOpponent,
}

export interface GameSettings {
  name: string;
  maxSize: number;
  shipTypeList: {
    [shipName: string]: {
      name: string;
      size: number;
      quantity: number;
    };
  };
}

export interface ContextState {
  gameSettings: GameSettings;
  gameStage: GameStage;
  playerGrid: GameGridState;
  opponentGrid: GameGridState;
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

export const PLAYER_READY = 'PLAYER_READY';

interface PlayerReadyAction extends Action {
  type: typeof PLAYER_READY;
}

export type ContextActionType = NewShipAction
  | ExpandShipAction
  | RemoveShipAction
  | SplitShipAction
  | MergeShipsAction
  | ClearShipsAction
  | PlayerReadyAction;
