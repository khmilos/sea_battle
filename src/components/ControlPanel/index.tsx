import React, { useContext } from 'react';
import context from 'context';
import { play } from 'context/actions';
import { CLEAR_SHIPS } from 'context/types';
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
        onClick={() => dispatch({ type: CLEAR_SHIPS })}
      >
        RESET
      </button>
    </div>
  );
}

export default ControlPanel;
