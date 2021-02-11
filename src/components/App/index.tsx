import { useContext, useEffect } from 'react';
import { GameStage } from 'context/types';
import context from 'context';
import { initApp } from 'context/actions';
import GameGrid from 'components/GameGrid';
import ShipPanel from 'components/ShipPanel';
import ControlPanel from 'components/ControlPanel';
import GameLogPanel from 'components/GameLogPanel';
import styles from './styles.module.css';

function App() {
  const { state, dispatch } = useContext(context);
  const { gameStage } = state;
  useEffect(() => dispatch(initApp()), []);
  const stageList = [
    GameStage.Game,
    GameStage.WaitingOpponent,
    GameStage.End
  ];
  return (
    <div className={styles.wrapper}>
      <main className={styles.container}>
        <div className={styles.gridWrapper}>
          <div className={styles.grid}>
            <GameGrid gridKey='playerGrid' />
          </div>
          <div className={styles.grid}>
            <GameGrid gridKey='opponentGrid' />
          </div>
        </div>
        <aside className={styles.board}>
          { gameStage === GameStage.ShipsPlacement && <ShipPanel /> }
          {stageList.includes(gameStage) && (
            <GameLogPanel />
          )}
          <ControlPanel />
        </aside>
      </main>
    </div>
  );
}

export default App;
