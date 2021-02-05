import React, { useContext } from 'react';
import context from 'context';
import { play, clear } from 'context/actions';
import styles from './styles.module.css';

function ControlPanel() {
  const { state, dispatch } = useContext(context);
  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${styles.play}`}
        onClick={() => play(dispatch, state)()}
      >
        PLAY
      </button>
      <button
        className={`${styles.button} ${styles.reset}`}
        onClick={() => clear(dispatch, state)()}
      >
        RESET
      </button>
    </div>
  );
}

export default ControlPanel;
