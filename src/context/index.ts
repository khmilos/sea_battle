import { createContext } from 'react';
import { ContextValue, GameStage } from './types';

const initContext: ContextValue = {
  state: {
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
