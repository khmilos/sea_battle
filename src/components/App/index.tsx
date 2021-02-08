import React from 'react';
import GameGrid from 'components/GameGrid';
import ShipPanel from 'components/ShipPanel';
import ControlPanel from 'components/ControlPanel';
import GameLogPanel from 'components/GameLogPanel';
import styles from './styles.module.css';

function App() {
  return (
    <div className={styles.container}>
      <main className={styles.gridWrapper}>
        <section className={styles.grid}>
          <GameGrid gridKey='playerGrid' />
        </section>
        <section className={styles.grid}>
          <GameGrid gridKey='opponentGrid' />
        </section>
      </main>
      <aside className={styles.board}>
        <ShipPanel />
        <ControlPanel />
        <GameLogPanel />
      </aside>
    </div>
  );
}

export default App;
