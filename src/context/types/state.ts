import { ContextActionType } from './actions';

export type Cell = [number, number];

export type Ship = Cell[];

export interface ShipType {
  name: string;
  size: number;
  quantity: number;
}

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
    [shipName: string]: ShipType;
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
