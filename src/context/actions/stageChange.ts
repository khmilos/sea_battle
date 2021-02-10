import { Dispatch, State, GameStage, PLAYER_READY } from '../types';
import { isShipPlacementValid } from '../utils';
import { popupMessage } from './popupMessanger';

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
