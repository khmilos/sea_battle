import {
  PlayerMadeMove,
  PlayerMoveResponse,
  OpponentMadeMove,
  GameLogMessage,
  PopupMessage,
  NewShip,
  ExpandShip,
  RemoveShip,
  SplitShip,
  MergeShips,
  ClearShips,
  PlayerReady,
} from './actions';
import {
  GameSettings,
  GameStage,
  GameGridState,
  CurrentMove,
  MoveLog,
  Message,
} from './data';

export type Action = PlayerMadeMove
  | PlayerMoveResponse
  | OpponentMadeMove
  | GameLogMessage
  | PopupMessage
  | NewShip
  | ExpandShip
  | RemoveShip
  | SplitShip
  | MergeShips
  | ClearShips
  | PlayerReady;

export type ThunkAction = (dispatch: Dispatch, state: State) => void;

export type State = {
  gameSettings: GameSettings,
  gameStage: GameStage,
  playerGrid: GameGridState,
  opponentGrid: GameGridState,
  currentMove: CurrentMove,
  gameLogList: MoveLog[],
  popupMessanger: Message | null,
};

export type Dispatch = (action: Action | ThunkAction) => void;

export type Context = {
  state: State,
  dispatch: Dispatch,
};
