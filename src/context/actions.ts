import {
  Cell,
  ContextDispatch,
  ContextState,
  GameStage,
  GridKey,
  Ship,
  ShipType,
  NEW_SHIP,
  EXPAND_SHIP,
  MERGE_SHIPS,
  PLAYER_READY,
  REMOVE_SHIP,
  SHRINK_SHIP,
  CLEAR_SHIPS,
  ContextActionType
} from './types';
import { findAdjacentShips, findShip, isDiagonallyAdjacent } from './utils';

function removeShip(
  shipList: Ship[],
  index: number,
   cell: Cell,
): ContextActionType | Error {
  if (shipList[index].length === 1) {
    return { type: REMOVE_SHIP, payload: { index } };
  }
  const cellIndex = shipList[index].findIndex((x) => {
    return x[0] === cell[0] && x[1] === cell[1];
  });
  return { type: SHRINK_SHIP, payload: { shipIndex: index, cellIndex } };
}

function addShip(
  shipList: Ship[],
  cell: Cell,
  maxSize: number,
): ContextActionType | Error {
  if (isDiagonallyAdjacent(shipList, cell)) {
    return Error('Diagonally adjacent');
  }

  const indices = findAdjacentShips(shipList, cell);

  switch (indices.length) {
    case 0: return { type: NEW_SHIP, payload: { cell} };
    case 1: {
      const index = indices[0];
      if (shipList[index].length >= maxSize) {
        return Error('Maximum length of ship');
      }
      return { type: EXPAND_SHIP, payload: { index, cell } };
    }
    case 2: {
      const length = shipList[indices[0]].length + shipList[indices[1]].length;
      if (length > maxSize - 1) {
        return Error('Maximum length of merged ship');
      }
      return { type: MERGE_SHIPS, payload: { indices, cell } };
    }
    default: return Error('Error state');
  }
}

export function gridClick(
  dispatch: ContextDispatch,
  state: ContextState,
  gridKey: GridKey
) {
  return (cell: Cell) => {
    if (gridKey === 'opponentGrid') {
      return Error('Wrong grid');
    }
    if (state.gameStage !== GameStage.ShipsPlacement) {
      return Error('Wrong stage');
    };

    const { shipList } = state.playerGrid
    const index = findShip(shipList, cell);

    let result;
    result = index !== -1
      ? removeShip(shipList, index, cell)
      : addShip(shipList, cell, state.gameSettings.maxSize);

    if (result instanceof Error) return console.log(result);
    return dispatch(result);
  }
}

export function clear(dispatch: ContextDispatch, state: ContextState) {
  return () => {
    if (state.gameStage !== GameStage.ShipsPlacement) {
      return Error('Wrong stage');
    }
    dispatch({ type: CLEAR_SHIPS });
  }
}

function isShipPlacementValid(shipList: Ship[], shipTypeList: ShipType[]) {
  const sizeList = shipList.map((ship) => ship.length);
  const sizeQuantityDict = sizeList.reduce((result, length) => {
    return { ...result, [length]: (result[length] || 0) + 1 };
  }, ({} as { [key: number]: number }));
  const isValid = shipTypeList.reduce((result, shipType) => {
    return result && sizeQuantityDict[shipType.size] === shipType.quantity;
  }, true);
  return isValid;
}

export function play(dispatch: ContextDispatch, state: ContextState) {
  return () => {
    if (state.gameStage !== GameStage.ShipsPlacement) {
      return Error('Wrong stage');
    }
    const { shipList } = state.playerGrid;
    const shipTypeList = Object.values(state.gameSettings.shipTypeList);
    if (!isShipPlacementValid(shipList, shipTypeList)) {
      return Error('Wrong ship placement');
    }
    return dispatch({ type: PLAYER_READY });
  }
}
