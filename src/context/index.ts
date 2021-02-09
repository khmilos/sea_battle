import { createContext } from "react";
import settingsData from "./settings.json";
import {
  Context,
  GameStage,
  CurrentMove,
  Ship,
  Action,
  ThunkAction,
} from "./types";

const testPlayerGridShipList: Ship[] = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  [
    [0, 5],
    [0, 6],
    [0, 7],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [2, 4],
    [2, 5],
  ],
  [
    [2, 7],
    [2, 8],
  ],
  [
    [4, 0],
    [4, 1],
  ],
  [[4, 3]],
  [[4, 5]],
  [[4, 7]],
  [[4, 9]],
];

const defaultValue: Context = {
  state: {
    gameLogList: [],
    currentMove: CurrentMove.Neither,
    gameSettings: {
      name: "basic",
      maxSize: 4,
      shipMetaList: settingsData["basic"],
    },
    gameStage: GameStage.ShipsPlacement,
    playerGrid: {
      shipList: testPlayerGridShipList,
      hitList: [],
    },
    opponentGrid: {
      shipList: [],
      hitList: [],
    },
    popupMessanger: null,
  },
  dispatch: (action: Action | ThunkAction) => {},
};

const context = createContext(defaultValue);

export default context;
