import { ReactNode, useContext, useReducer } from 'react';
import context from 'context';
import reducer from 'context/reducer';
import { ContextValue } from 'context/types';

const { Provider } = context;

function ContextProvider({ children }: { children: ReactNode }) {
  const { state } = useContext(context);
  const [providerState, providerDispatch] = useReducer(reducer, state);
  const providerValue: ContextValue = {
    state: providerState,
    dispatch: providerDispatch,
  };

  return <Provider value={providerValue}>{children}</Provider>;
}

export default ContextProvider;