export const PLAYER_READY = 'PLAYER_READY';
export const PLAYER_RESIGN = 'PLAYER_RESIGN';

export type PlayerReady = {
  type: typeof PLAYER_READY,
};

export type PlayerResign = {
  type: typeof PLAYER_RESIGN,
};
