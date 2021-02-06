import { createContext } from 'react';
import { ContextValue, GameStage, CurrentMove, Ship } from './types';
import settingsData from './settings.json';

const testPlayerGridShipList: Ship[] = [[[0,0],[0,1],[0,2],[0,3]],[[0,5],[0,6],[0,7]],[[2,0],[2,1],[2,2]],[[2,4],[2,5]],[[2,7],[2,8]],[[4,0],[4,1]],[[4,3]],[[4,5]],[[4,7]],[[4,9]]]

const initContext: ContextValue = {
  state: {
    currentMove: CurrentMove.Neither,
    gameSettings: {
      name: 'basic',
      maxSize: 4,
      shipTypeList: settingsData['basic'],
    },
    gameStage: GameStage.ShipsPlacement,
    playerGrid: {
      shipList: testPlayerGridShipList,
      missList: [],
      hitList: [],
    },
    opponentGrid: {
      shipList: [],
      missList: [],
      hitList: [],
    },
  },
  dispatch: (action) => {},
};

const context = createContext(initContext);

export default context;
