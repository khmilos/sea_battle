import React, { useContext } from 'react';
import context from 'context';
import { CLEAR_SHIPS } from 'context/types';
import styles from './styles.module.css';

function ControlPanel() {
  const { dispatch } = useContext(context);
  return (
    <div className={styles.container}>
      <button className={`${styles.button} ${styles.play}`}>
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
