import {
  Cell,
  ContextDispatch,
  ContextState,
  EXPAND_SHIP,
  GameStage,
  MERGE_SHIPS,
  NEW_SHIP,
  REMOVE_SHIP,
  SHRINK_SHIP
} from './types';
import { findAdjacentShips, findShip, isDiagonallyAdjacent } from './utils';

export function handleGridClick(
  dispatch: ContextDispatch,
  state: ContextState
){
  return (cell: Cell) => {
    if (state.gameStage !== GameStage.ShipsPlacement) return;

    const { shipList } = state.playerGrid
    const index = findShip(shipList, cell);
    
    // Handle remove
    if (index !== -1) {
      if (shipList[index].length === 1) {
        return dispatch({ type: REMOVE_SHIP, payload: { index } });
      }
      const cellIndex = shipList[index].findIndex((x) => {
        return x[0] === cell[0] && x[1] === cell[1];
      });
      return dispatch({
        type: SHRINK_SHIP,
        payload: { shipIndex: index, cellIndex },
      });
    }

    // Handle adding
    if (isDiagonallyAdjacent(shipList, cell)) {
      return Error('Diagonally adjacent');
    }
    const indices = findAdjacentShips(shipList, cell);
    switch (indices.length) {
      case 0: return dispatch({ type: NEW_SHIP, payload: { cell} });
      case 1: {
        if (shipList[indices[0]].length >= 4) {
          return Error('Maximum length of ship');
        }
        return dispatch({
          type: EXPAND_SHIP,
          payload: { index: indices[0], cell },
        });
      }
      case 2: {
        const length = shipList[indices[0]].length
          + shipList[indices[1]].length
          + 1;
        if (length > 4) {
          return Error('Maximum length of merged ship');
        }
        return dispatch({
          type: MERGE_SHIPS,
          payload: { indices: (indices as [number, number]), cell },
        });
      }
      default: return Error('Error state');
    }
  }
}
