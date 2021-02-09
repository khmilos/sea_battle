import { Cell } from '../data';

export const PLAYER_MADE_MOVE = 'PLAYER_MADE_MOVE';
export const PLAYER_MOVE_RESPONSE = 'PLAYER_MOVE_RESPONSE';
export const OPPONENT_MADE_MOVE = 'OPPONENT_MADE_MOVE';

export type PlayerMadeMove = {
  type: typeof PLAYER_MADE_MOVE,
  payload: {
    cell: Cell,
  },
};

export type PlayerMoveResponse = {
  type: typeof PLAYER_MOVE_RESPONSE,
  payload: {
    isHit: boolean,
    cell: Cell,
  },
};

export type OpponentMadeMove = {
  type: typeof OPPONENT_MADE_MOVE,
  payload: {
    cell: Cell,
    isHit: boolean,
  },
};
