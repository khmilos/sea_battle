import React from 'react';
import GameGrid from 'components/GameGrid';
import ShipPanel from 'components/ShipPanel';

function App() {
  return (
    <div>
      <GameGrid gridKey='playerGrid' />
      <ShipPanel />
    </div>
  );
}

export default App;
