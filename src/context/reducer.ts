import {
  ContextState,
  ContextActionType,
  Ship,
  GameStage,
  CurrentMove,
  CLEAR_SHIPS,
  NEW_SHIP,
  EXPAND_SHIP,
  REMOVE_SHIP,
  SHRINK_SHIP,
  MERGE_SHIPS,
  PLAYER_READY,
  PLAYER_MADE_MOVE,
  PLAYER_MOVE_RESPONSE,
} from './types';

function reducer (state: ContextState, action: ContextActionType) {
  switch (action.type) {
    case NEW_SHIP: {
      const { cell } = action.payload;
      const ship: Ship = [cell];
      const shipList = [...state.playerGrid.shipList, ship];
      return { ...state, playerGrid: { ...state.playerGrid, shipList } };
    }
    case EXPAND_SHIP: {
      const { index, cell } = action.payload;
      const ship: Ship = [...state.playerGrid.shipList[index], cell]
        .sort((a, b) => a[0] + a[1] - b[0] - b[1]);
      const shipList = [
        ...state.playerGrid.shipList.filter((_, i) => i !== index),
        ship,
      ];
      return { ...state, playerGrid: { ...state.playerGrid, shipList } };
    }
    case REMOVE_SHIP: {
      const { index } = action.payload;
      const shipList = state.playerGrid.shipList.filter((_, i) => i !== index);
      return { ...state, playerGrid: { ...state.playerGrid, shipList } };
    }
    case SHRINK_SHIP: {
      const { shipIndex, cellIndex } = action.payload;
      const shipList = [
        ...state.playerGrid.shipList.filter((_, i) => i !== shipIndex),
        state.playerGrid.shipList[shipIndex].slice(0, cellIndex),
        state.playerGrid.shipList[shipIndex].slice(cellIndex + 1),
      ].filter((x) => x.length > 0);
      return { ...state, playerGrid: { ...state.playerGrid, shipList } };
    }
    case MERGE_SHIPS: {
      const { indices, cell } = action.payload;
      const ship = [
        ...state.playerGrid.shipList[indices[0]],
        cell,
        ...state.playerGrid.shipList[indices[1]],
      ].sort((a, b) => a[0] + a[1] - b[0] - b[1]);
      const shipList = [
        ...state.playerGrid.shipList.filter((_, i) => !indices.includes(i)),
        ship,
      ];
      return { ...state, playerGrid: { ...state.playerGrid, shipList } };
    }
    case CLEAR_SHIPS: {
      return {
        ...state,
        playerGrid: { ...state.playerGrid, shipList: [] },
      };
    }
    case PLAYER_READY: {
      return { ...state, gameStage: GameStage.Game };
    }
    case PLAYER_MADE_MOVE: {
      return { ...state, currentMove: CurrentMove.Waiting };
    }
    case PLAYER_MOVE_RESPONSE: {
      if (action.payload.isHit) {
        return { ...state, currentMove: CurrentMove.Player };
      }
      return { ...state, currentMove: CurrentMove.Opponent };
    }
    default: return state;
  }
}

export default reducer;
