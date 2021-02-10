import { PopupMessage, POPUP_MESSAGE } from '../types';

export function popupMessage(title: string, text: string): PopupMessage {
  return { type: POPUP_MESSAGE, payload: { title, text } };
}
