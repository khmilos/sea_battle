import { createContext } from 'react';
import { ContextValue, GameStage } from './types';
import settingsData from './settings.json';

const initContext: ContextValue = {
  state: {
    gameSettings: {
      name: 'basic',
      maxSize: 4,
      shipTypeList: settingsData['basic'],
    },
    gameStage: GameStage.ShipsPlacement,
    playerGrid: {
      shipList: [],
      missList: [],
      hitList: [],
    },
  },
  dispatch: (action) => {},
};

const context = createContext(initContext);

export default context;
