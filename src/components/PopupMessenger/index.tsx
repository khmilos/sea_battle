import { ReactNode, useState, useEffect, useContext } from 'react';
import context from 'context';
import CloseIcon from 'assets/close.svg';
import { MessageItem } from './types';
import styles from './styles.module.css';

function PopupMessanger({ children }: { children: ReactNode }) {
  const { state } = useContext(context);
  const [messageList, setMessageList] = useState<MessageItem[]>([]);
  
  useEffect(() => {
    if (!state.popupMessanger) return;
    const message: MessageItem = {
      title: state.popupMessanger.title,
      text: state.popupMessanger.text,
      timeout: setTimeout(() => {
        setMessageList((prev) => prev.filter((x) => x !== message));
      }, 5000),
    };
    setMessageList((prev) => [...prev, message]);
  }, [state.popupMessanger]);

  return (
    <>
      {children}
      <div className={styles.container}>
        {messageList.map((message, i) => (
          <div key={i} className={styles.message}>
            <span className={styles.title}>{message.title}</span>
            <span className={styles.text}>{message.text}</span>
            <button
              className={styles.close}
              onClick={() => {
                clearInterval(message.timeout);
                setMessageList((prev) => prev.filter((x) => x !== message));
              }}>
              <img src={CloseIcon} alt='Close' />
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default PopupMessanger;
