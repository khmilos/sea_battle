import { acceptMove, makeMove } from 'aiEmulation';
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
  ContextActionType,
  CurrentMove,
  PLAYER_MADE_MOVE,
  PLAYER_MOVE_RESPONSE,
  OPPONENT_MADE_MOVE,
  GAME_LOG_MESSAGE,
} from './types';
import { findAdjacentShips, findShip, isDiagonallyAdjacent } from './utils';

type Either<T, U> = [T, null] | [null, U];

function createRemoveAction(
  shipList: Ship[],
  cell: Cell,
  index: number,
): Either<Error, ContextActionType> {
  if (shipList[index].length === 1) {
    return [null, { type: REMOVE_SHIP, payload: { index } }];
  }

  const cellIndex = shipList[index].findIndex((item) => {
    return item[0] === cell[0] && item[1] === cell[1];
  });

  const action: ContextActionType = {
    type: SHRINK_SHIP,
    payload: { shipIndex: index, cellIndex },
  };
  return [null, action];
}

function createAddAction(
  shipList: Ship[],
  cell: Cell,
  maxSize: number,
): Either<Error, ContextActionType> {
  if (isDiagonallyAdjacent(shipList, cell)) {
    return [Error('Diagonally adjacent'), null];
  }

  const indices = findAdjacentShips(shipList, cell);

  switch (indices.length) {
    case 0: return [null, { type: NEW_SHIP, payload: { cell} }];
    case 1: {
      const index = indices[0];
      if (shipList[index].length >= maxSize) {
        return [Error('Maximum length of ship'), null];
      }
      return [null, { type: EXPAND_SHIP, payload: { index, cell } }];
    }
    case 2: {
      const length = shipList[indices[0]].length + shipList[indices[1]].length;
      if (length > maxSize - 1) {
        return [Error('Maximum length of merged ship'), null];
      }
      return [null, { type: MERGE_SHIPS, payload: { indices, cell } }];
    }
    default: return [Error('Error state'), null];
  }
}

export function gridClick(
  dispatch: ContextDispatch,
  state: ContextState,
  gridKey: GridKey,
) {
  const { gameStage } = state;
  const { shipList } = state[gridKey];

  if (gridKey === 'playerGrid') {
    if (gameStage !== GameStage.ShipsPlacement) return () => {};
    const { maxSize } = state.gameSettings;
    return (cell: Cell) => {
      const index = findShip(shipList, cell);
      const [error, action] = index !== -1
        ? createRemoveAction(shipList, cell, index)
        : createAddAction(shipList, cell, maxSize);
      if (error) return;
      return dispatch(action as ContextActionType); 
    }
  }

  const { currentMove } = state;
  if (gameStage !== GameStage.Game || currentMove !== CurrentMove.Player) {
    return () => {};
  }

  return (cell: Cell) => {
    dispatch({ type: PLAYER_MADE_MOVE, payload: { cell } });
    const isHit = acceptMove(cell);
    dispatch({ type: PLAYER_MOVE_RESPONSE, payload: { cell, isHit } });
    dispatch({
      type: GAME_LOG_MESSAGE,
      payload: { player: 'player', cell, isHit },
    });
    if (!isHit) {
      while (true) {
        const aiMove = makeMove();
        const isOpponentHit = findShip(state.playerGrid.shipList, aiMove);
        if (isOpponentHit !== -1) {
          dispatch({
            type: OPPONENT_MADE_MOVE,
            payload: { cell: aiMove, isHit: false },
          });
          dispatch({
            type: GAME_LOG_MESSAGE,
            payload: { player: 'opponent', cell: aiMove, isHit: true },
          });
          continue;
        }
        dispatch({
          type: OPPONENT_MADE_MOVE,
          payload: { cell: aiMove, isHit: false },
        });
        dispatch({
          type: GAME_LOG_MESSAGE,
          payload: { player: 'opponent', cell: aiMove, isHit: false },
        });
        return;
      }
    }
  };
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
    console.log('PLAYER READY')
    return dispatch({ type: PLAYER_READY });
  }
}
