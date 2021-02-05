import { createContext } from 'react';
import { ContextValue } from './types';

const initContext: ContextValue = {
  state: { },
  dispatch: (action) => {},
};

const context = createContext(initContext);

export default context;
