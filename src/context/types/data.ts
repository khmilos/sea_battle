export type Cell = [number, number];

export type Ship = Cell[];

export type ShipMeta = {
  name: string,
  size: number,
  quantity: number,
};

export type GameGridState = {
  shipList: Ship[],
  hitList: Cell[],
};

export type GameSettings = {
  name: string,
  maxSize: number,
  shipMetaList: {
    [shipName: string]: ShipMeta,
  },
};

export type MoveLog = {
  player: string,
  cell: Cell,
  isHit: boolean,
};

export type Message = {
  title: string,
  text: string,
};

export enum GameStage {
  ShipsPlacement,
  WaitingOpponent,
  Game,
};

export enum CurrentMove {
  Player,
  Waiting,
  Opponent,
  Neither,
};

export type GridKey = 'playerGrid' | 'opponentGrid';
