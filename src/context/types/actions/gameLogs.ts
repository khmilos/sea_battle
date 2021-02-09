import { Cell } from '../data';

export const GAME_LOG_MESSAGE = 'GAME_LOG_MESSAGE';

export type GameLogMessage = {
  type: typeof GAME_LOG_MESSAGE,
  payload: {
    player: string,
    cell: Cell,
    isHit: boolean,
  },
};
