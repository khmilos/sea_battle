import { Cell, GameLogMessage, GAME_LOG_MESSAGE } from '../types';

export function logMove(
  player: string,
  cell: Cell,
  isHit: boolean
): GameLogMessage {
  return { type: GAME_LOG_MESSAGE, payload: { player, cell, isHit } };
}
