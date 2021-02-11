export const PLAYER_READY = 'PLAYER_READY';
export const PLAYER_RESIGN = 'PLAYER_RESIGN';
export const PLAYER_VICTORY = 'PLAYER_VICTORY';
export const PLAYER_DEFEAT = 'PLAYER_DEFEAT';

export type PlayerReady = {
  type: typeof PLAYER_READY,
};

export type PlayerResign = {
  type: typeof PLAYER_RESIGN,
};

export type PlayerVictory = {
  type: typeof PLAYER_VICTORY,
};

export type PlayerDefeat = {
  type: typeof PLAYER_DEFEAT,
};
