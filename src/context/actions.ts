import { getAiMove, putPlayerMove } from 'aiEmulation';
import {
  Dispatch,
  State,
  Cell,
  GameStage,
  NEW_SHIP,
  EXPAND_SHIP,
  MERGE_SHIPS,
  PLAYER_READY,
  REMOVE_SHIP,
  SHRINK_SHIP,
  CLEAR_SHIPS,
  PLAYER_MADE_MOVE,
  PLAYER_MOVE_RESPONSE,
  OPPONENT_MADE_MOVE,
  GAME_LOG_MESSAGE,
  POPUP_MESSAGE,
  PopupMessage,
  PlayerMadeMove,
  PlayerMoveResponse,
  GameLogMessage,
  OpponentMadeMove,
} from './types';
import {
  findAdjacentShips,
  findShip,
  isDiagonallyAdjacent,
  isShipPlacementValid,
} from './utils';

export function popupMessage(title: string, text: string): PopupMessage {
  return { type: POPUP_MESSAGE, payload: { title, text } };
}

export function removeShip(cell: Cell) {
  return (dispatch: Dispatch, state: State) => {
    const { shipList } = state.playerGrid;
    const index = findShip(shipList, cell);
    if (shipList[index].length === 1) {
      return dispatch({ type: REMOVE_SHIP, payload: { index } });
    }
    const cellIndex = shipList[index].findIndex((item) => {
      return item[0] === cell[0] && item[1] === cell[1];
    });
    return dispatch({
      type: SHRINK_SHIP,
      payload: { shipIndex: index, cellIndex },
    });
  };
}

export function addShip(cell: Cell) {
  return (dispatch: Dispatch, state: State ) => {
    const { shipList } = state.playerGrid;
    if (isDiagonallyAdjacent(shipList, cell)) {
      return dispatch(popupMessage('Error', 'Diagonally adjacent!'));
    }
    const indices = findAdjacentShips(shipList, cell);
    switch (indices.length) {
      case 0: return dispatch({ type: NEW_SHIP, payload: { cell} });
      case 1: {
        const { maxSize } = state.gameSettings;
        const index = indices[0];
        if (shipList[index].length >= maxSize) {
          return dispatch(popupMessage('Error', 'Maximum length of ship!'));
        }
        return dispatch({ type: EXPAND_SHIP, payload: { index, cell } });
      }
      case 2: {
        const { maxSize } = state.gameSettings;
        const length = shipList[indices[0]].length
          + shipList[indices[1]].length
          + 1;
        if (length > maxSize) {
          return dispatch(popupMessage('Error', 'Maximum length of ship!'));
        }
        return dispatch({ type: MERGE_SHIPS, payload: { indices, cell } });
      }
      default: return;
    }
  };
}

export function clear() {
  return (dispatch: Dispatch, state: State) => {
    const { gameStage } = state;
    if (gameStage !== GameStage.ShipsPlacement) return;
    dispatch({ type: CLEAR_SHIPS });
  };
}

export function play() {
  return (dispatch: Dispatch, state: State) => {
    console.log('play');
    const { gameStage } = state;
    if (gameStage !== GameStage.ShipsPlacement) return;
    const { shipList } = state.playerGrid;
    const shipMetaList = Object.values(state.gameSettings.shipMetaList);
    if (!isShipPlacementValid(shipList, shipMetaList)) {
      return dispatch(popupMessage('Error', 'Ship placement isn\'t valid'));
    }
    dispatch(popupMessage('Message', 'Game started!'));
    return dispatch({ type: PLAYER_READY });
  };
}

export function move(cell: Cell): PlayerMadeMove {
  return { type: PLAYER_MADE_MOVE, payload: { cell } };
}

export function moveResponse(cell: Cell, isHit: boolean): PlayerMoveResponse {
  return { type: PLAYER_MOVE_RESPONSE, payload: { cell, isHit } };
}

export function logMove(
  player: string,
  cell: Cell,
  isHit: boolean
): GameLogMessage {
  return { type: GAME_LOG_MESSAGE, payload: { player, cell, isHit } };
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
    if (!isPlayerHit) {
      const { shipList } = state.playerGrid;
      while (true) {
        const aiMove = getAiMove()
        const isOpponentHit = findShip(shipList, aiMove) !== -1;
        dispatch(opponentMove(aiMove, isOpponentHit));
        dispatch(logMove('opponent', aiMove, isOpponentHit));
        if (!isOpponentHit) return;
      }
    }
  };
}
