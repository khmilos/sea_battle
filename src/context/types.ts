export interface ContextState {} // TODO: Implement Context State for Components

export type ContextDispatch = (action: ContextActionTypes) => void;

export interface ContextValue {
  state: ContextState;
  dispatch: ContextDispatch;
}

interface Action {
  type: string;
}

export type ContextActionTypes = Action; // TODO: Implement Context Actions
