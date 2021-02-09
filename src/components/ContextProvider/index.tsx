import { ReactNode, useContext, useReducer } from 'react';
import context from 'context';
import reducer from 'context/reducer';
import { Context, Action, ThunkAction } from 'context/types';

const { Provider } = context;

function ContextProvider({ children }: { children: ReactNode }) {
  const { state: initialState } = useContext(context);
  const [state, dispatch] = useReducer(reducer, initialState);

  const wrapper = (action: Action | ThunkAction) => {
    if (typeof action === 'function') return action(dispatch, state);
    return dispatch(action);
  };

  const value: Context = { state, dispatch: wrapper };

  return <Provider value={value}>{children}</Provider>;
}

export default ContextProvider;