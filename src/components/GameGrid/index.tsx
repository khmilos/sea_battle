import React, { useContext } from 'react';

import context from 'context';
import { gridClick } from 'context/actions';
import { GameStage, GridKey } from 'context/types';

import { initGrid, getClass } from './utils';
import styles from './styles.module.css';

function GameGrid({ gridKey }: { gridKey: GridKey }) {
  const { state, dispatch } = useContext(context);
  const { gameStage } = state;
  const handleClick = gridClick(dispatch, state, gridKey);
  const grid = initGrid(state[gridKey].shipList, gridKey);
  return (
    <table className={styles.table}>
      <tbody>
        {grid.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>
                <button
                  className={`${styles.cell} ${getClass(cell)}`}
                  onClick={() => handleClick([i, j])}
                  disabled={gameStage !== GameStage.ShipsPlacement}
                >
                </button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default GameGrid;
