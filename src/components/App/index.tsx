import { useContext } from 'react';
import context from 'context';
import { GameStage } from 'context/types';
import GameGrid from 'components/GameGrid';
import ShipPanel from 'components/ShipPanel';
import ControlPanel from 'components/ControlPanel';
import GameLogPanel from 'components/GameLogPanel';
import styles from './styles.module.css';
import MenuIcon from 'assets/menu.svg';

function App() {
  const { state, dispatch } = useContext(context);
  const { gameStage } = state;

  const handler = () => { };

  return (
    <div className={styles.container}>
      {/* <header>
        <button className={styles.menu} onClick={handler}>
          <img src={MenuIcon} alt='Menu' />
        </button>
      </header> */}
      <div className={styles.innerContainer}>
        <main className={styles.gridWrapper}>
          <div className={styles.grid}>
            <GameGrid gridKey='playerGrid' />
          </div>
          <div className={styles.grid}>
            <GameGrid gridKey='opponentGrid' />
          </div>
        </main>
        <aside className={styles.board}>
          { gameStage === GameStage.ShipsPlacement && <ShipPanel /> }
          { gameStage === GameStage.Game && <GameLogPanel /> }
          <ControlPanel />
        </aside>
      </div>
    </div>
  );
}

export default App;
