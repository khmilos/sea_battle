import {
  State,
  Action,
  Ship,
  GameStage,
  CurrentMove,
  CLEAR_SHIPS,
  INIT_APP,
  NEW_SHIP,
  EXPAND_SHIP,
  REMOVE_SHIP,
  SHRINK_SHIP,
  MERGE_SHIPS,
  PLAYER_READY,
  PLAYER_MADE_MOVE,
  PLAYER_MOVE_RESPONSE,
  OPPONENT_MADE_MOVE,
  GAME_LOG_MESSAGE,
  POPUP_MESSAGE,
  ThunkAction,
  PLAYER_RESIGN,
  PLAYER_VICTORY,
  PLAYER_DEFEAT,
} from './types';
import { defaultState } from './index';

function reducer(state: State, action: Action | ThunkAction) {
  // TODO: Peek problem in ContextProvider when action has ThunkAction type
  if (typeof action === 'function') return state; 
  switch (action.type) {
    case INIT_APP: {
      const storageState = localStorage.getItem('state');
      if (storageState) return JSON.parse(storageState);
      localStorage.setItem('state', JSON.stringify(state));
      return state;
    }
    case NEW_SHIP: {
      const { cell } = action.payload;
      const ship: Ship = [cell];
      const shipList = [...state.playerGrid.shipList, ship];
      const newState = {
        ...state,
        playerGrid: { ...state.playerGrid, shipList }
      };
      localStorage.setItem('state', JSON.stringify(newState));
      return newState
    }
    case EXPAND_SHIP: {
      const { index, cell } = action.payload;
      const ship: Ship = [...state.playerGrid.shipList[index], cell]
        .sort((a, b) => a[0] + a[1] - b[0] - b[1]);
      const shipList = [
        ...state.playerGrid.shipList.filter((_, i) => i !== index),
        ship,
      ];
      const newState = {
        ...state,
        playerGrid: { ...state.playerGrid, shipList }
      };
      localStorage.setItem('state', JSON.stringify(newState));
      return newState;
    }
    case REMOVE_SHIP: {
      const { index } = action.payload;
      const shipList = state.playerGrid.shipList.filter((_, i) => i !== index);
      const newState = {
        ...state,
        playerGrid: { ...state.playerGrid, shipList }
      };
      localStorage.setItem('state', JSON.stringify(newState));
      return newState;
    }
    case SHRINK_SHIP: {
      const { shipIndex, cellIndex } = action.payload;
      const shipList = [
        ...state.playerGrid.shipList.filter((_, i) => i !== shipIndex),
        state.playerGrid.shipList[shipIndex].slice(0, cellIndex),
        state.playerGrid.shipList[shipIndex].slice(cellIndex + 1),
      ].filter((x) => x.length > 0);
      const newState = {
        ...state,
        playerGrid: { ...state.playerGrid, shipList }
      };
      localStorage.setItem('state', JSON.stringify(newState));
      return newState;
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
      const newState = {
        ...state,
        playerGrid: { ...state.playerGrid, shipList }
      };
      localStorage.setItem('state', JSON.stringify(newState));
      return newState;
    }
    case CLEAR_SHIPS: {
      const newState = {
        ...state,
        playerGrid: { ...state.playerGrid, shipList: [] }
      };
      localStorage.setItem('state', JSON.stringify(newState));
      return newState;
    }
    case PLAYER_READY: {
      const newState = {
        ...state,
        gameStage: GameStage.Game,
        currentMove: CurrentMove.Player,
      };
      localStorage.setItem('state', JSON.stringify(newState));
      return newState;
    }
    case PLAYER_RESIGN: {
      const newState = defaultState;
      localStorage.setItem('state', JSON.stringify(newState));
      return newState;
    }
    case PLAYER_VICTORY: {
      const newState = {...state, gameStage: GameStage.End };
      localStorage.setItem('state', JSON.stringify(newState));
      return newState;
    }
    case PLAYER_DEFEAT: {
      const newState = {...state, gameStage: GameStage.End };
      localStorage.setItem('state', JSON.stringify(newState));
      return newState;
    }
    case PLAYER_MADE_MOVE: {
      const newState = { ...state, currentMove: CurrentMove.Waiting };
      localStorage.setItem('state', JSON.stringify(newState));
      return newState;
    }
    case PLAYER_MOVE_RESPONSE: {
      const hitList = [...state.opponentGrid.hitList, action.payload.cell]
      if (action.payload.isHit) {
        const shipList = [...state.opponentGrid.shipList, [action.payload.cell]]
        return {
          ...state,
          currentMove: CurrentMove.Player,
          opponentGrid: { ...state.opponentGrid, shipList, hitList }
        };
      }
      const newState = {
        ...state,
        currentMove: CurrentMove.Opponent,
        opponentGrid: { ...state.opponentGrid, hitList }
      };
      localStorage.setItem('state', JSON.stringify(newState));
      return newState;
    }
    case OPPONENT_MADE_MOVE: {
      const { cell, isHit } = action.payload;
      const hitList = [...state.playerGrid.hitList, cell]
      const newState = {
        ...state,
        playerGrid: { ...state.playerGrid, hitList },
        currentMove: isHit ? CurrentMove.Opponent : CurrentMove.Player,
      };
      localStorage.setItem('state', JSON.stringify(newState));
      return newState;
    }
    case GAME_LOG_MESSAGE: {
      const newState = {
        ...state,
        gameLogList: [...state.gameLogList, action.payload]
      };
      localStorage.setItem('state', JSON.stringify(newState));
      return newState;
    }
    case POPUP_MESSAGE: {
      return { ...state, popupMessanger: action.payload };
    }
    default: return state;
  }
}

export default reducer;
