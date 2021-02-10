import GameGrid from 'components/GameGrid';
import ShipPanel from 'components/ShipPanel';
import ControlPanel from 'components/ControlPanel';
import GameLogPanel from 'components/GameLogPanel';
import styles from './styles.module.css';
import MenuIcon from 'assets/menu.svg';

function App() {
  const handler = () => {
    console.log(11)
  }

  return (
    <div className={styles.container}>
      <header>
        <button className={styles.menu} onClick={handler}>
          <img src={MenuIcon} alt='Menu' />
        </button>
      </header>
      <main className={styles.gridWrapper}>
        <div className={styles.grid}>
          <GameGrid gridKey='playerGrid' />
        </div>
        <div className={styles.grid}>
          <GameGrid gridKey='opponentGrid' />
        </div>
      </main>
      <aside className={styles.board}>
        <ShipPanel />
        <GameLogPanel />
        <ControlPanel />
      </aside>
    </div>
  );
}

export default App;
