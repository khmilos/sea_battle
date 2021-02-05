import React, { useContext } from 'react';

import context from 'context';
import { findShip } from 'context/utils';
import { gridClick } from 'context/actions';
import { GridKey } from 'context/types';

import { getClass } from './utils';
import { CellType } from './types';
import styles from './styles.module.css';

function GameGrid({ gridKey }: { gridKey: GridKey }) {
  const { state, dispatch } = useContext(context);
  const handleClick = gridClick(dispatch, state, gridKey);
  const grid = Array(10).fill(null).map((_, i) => {
    return Array(10).fill(null).map((_, j) => {
      if (gridKey === 'opponentGrid') return CellType.Unknown;
      if (findShip(state[gridKey].shipList, [i, j]) === -1) {
        return CellType.Empty;
      }
      return CellType.Ship;
    });
  });
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
