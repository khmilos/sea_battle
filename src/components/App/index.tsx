import { useContext } from 'react';
import context from 'context';
import { GameStage } from 'context/types';
import GameGrid from 'components/GameGrid';
import ShipPanel from 'components/ShipPanel';
import ControlPanel from 'components/ControlPanel';
import GameLogPanel from 'components/GameLogPanel';
import styles from './styles.module.css';

function App() {
  const { state } = useContext(context);
  const { gameStage } = state;
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
          { gameStage === GameStage.Game && <GameLogPanel /> }
          <ControlPanel />
        </aside>
      </main>
    </div>
  );
}

export default App;
