import {
  Cell,
  Dispatch,
  State,
  GameStage,
  CLEAR_SHIPS,
  NEW_SHIP,
  REMOVE_SHIP,
  SHRINK_SHIP,
  EXPAND_SHIP,
  MERGE_SHIPS,
} from '../types';
import { findShip, findAdjacentShips, isDiagonallyAdjacent } from '../utils';
import { popupMessage } from './popupMessanger';

export function clear() {
  return (dispatch: Dispatch, state: State) => {
    const { gameStage } = state;
    if (gameStage !== GameStage.ShipsPlacement) return;
    dispatch({ type: CLEAR_SHIPS });
  };
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
