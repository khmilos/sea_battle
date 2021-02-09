import { useContext } from 'react';
import context from 'context';
import { play, clear } from 'context/actions';
import styles from './styles.module.css';

function ControlPanel() {
  const { dispatch } = useContext(context);
  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${styles.play}`}
        onClick={() => dispatch(play())}
      >
        PLAY
      </button>
      <button
        className={`${styles.button} ${styles.reset}`}
        onClick={() => dispatch(clear())}
      >
        RESET
      </button>
    </div>
  );
}

export default ControlPanel;
