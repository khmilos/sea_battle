import { Message } from '../data';

export const POPUP_MESSAGE = 'POPUP_MESSAGE';

export type PopupMessage = {
  type: typeof POPUP_MESSAGE,
  payload: Message,
};
