export interface Message {
  title: string;
  text: string;
}

export interface MessageItem extends Message {
  timeout: NodeJS.Timeout;
}
