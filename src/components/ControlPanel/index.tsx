import { useContext } from 'react';
import context from 'context';
import { play, clear, resign } from 'context/actions';
import styles from './styles.module.css';
import { GameStage } from 'context/types';

function ControlPanel() {
  const { state, dispatch } = useContext(context);
  const { gameStage } = state;
  const stageList = [
    GameStage.Game,
    GameStage.WaitingOpponent,
    GameStage.End
  ];
  return (
    <div className={styles.container}>
      {gameStage === GameStage.ShipsPlacement && (
        <>
          <button
            className={`${styles.button} ${styles.play}`}
            onClick={() => dispatch(play())}
          >
            Play
          </button>
          <button
            className={`${styles.button} ${styles.reset}`}
            onClick={() => dispatch(clear())}
          >
            Reset
          </button>
        </>
      )}
      {stageList.includes(gameStage)&& (
        <button
          className={`${styles.button} ${styles.play}`}
          onClick={() => dispatch(resign())}
        >
          Restart
        </button>
      )}
    </div>
  );
}

export default ControlPanel;
