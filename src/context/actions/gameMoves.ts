import {
  Cell,
  PlayerMadeMove,
  PLAYER_MADE_MOVE,
  PlayerMoveResponse,
  PLAYER_MOVE_RESPONSE,
  OpponentMadeMove,
  OPPONENT_MADE_MOVE,
  Dispatch,
  State,
  PLAYER_VICTORY,
  PLAYER_DEFEAT,
} from '../types';
import { findShip, isDefeat } from '../utils';
import { logMove } from './gameLogs';
import { getAiMove, putPlayerMove } from 'aiEmulation';
import { popupMessage } from './popupMessanger';

export function move(cell: Cell): PlayerMadeMove {
  return { type: PLAYER_MADE_MOVE, payload: { cell } };
}

export function moveResponse(cell: Cell, isHit: boolean): PlayerMoveResponse {
  return { type: PLAYER_MOVE_RESPONSE, payload: { cell, isHit } };
}

export function opponentMove(cell: Cell, isHit: boolean): OpponentMadeMove {
  return { type: OPPONENT_MADE_MOVE, payload: { cell, isHit } };
}

export function gameFlow(cell: Cell) {
  return (dispatch: Dispatch, state: State) => {
    dispatch(move(cell));
    const isPlayerHit = putPlayerMove(cell);
    dispatch(moveResponse(cell, isPlayerHit));
    dispatch(logMove('player', cell, isPlayerHit));
    const { shipList } = state.opponentGrid;
    if (shipList.length === 20) {
      dispatch(popupMessage('Message', 'Victory!'));
      return dispatch({ type: PLAYER_VICTORY });
    }
    if (!isPlayerHit) {
      const { shipList } = state.playerGrid;
      while (true) {
        const aiMove = getAiMove();
        const isOpponentHit = findShip(shipList, aiMove) !== -1;
        dispatch(opponentMove(aiMove, isOpponentHit));
        dispatch(logMove('opponent', aiMove, isOpponentHit));
        if (!isOpponentHit) return;
        if (isDefeat(state.playerGrid.shipList, state.playerGrid.hitList)) {
          return dispatch({ type: PLAYER_DEFEAT });
        }
      }
    }
  };
}
