import { INIT_APP, InitApp } from '../types';

export function initApp(): InitApp {
  return { type: INIT_APP };
}

export * from './gameLogs';
export * from './gameMoves';
export * from './popupMessanger';
export * from './shipPlacement';
export * from './stageChange';
