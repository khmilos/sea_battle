import React, { useContext } from 'react';

import context from 'context';
import { gridClick } from 'context/actions';
import { GameStage, GridKey } from 'context/types';

import { initGrid, getClass } from './utils';
import styles from './styles.module.css';

function GameGrid({ gridKey }: { gridKey: GridKey }) {
  const { state, dispatch } = useContext(context);
  const { gameStage } = state;
  const { shipList, hitList } = state[gridKey];
  const handleClick = gridClick(dispatch, state, gridKey);
  const grid = initGrid(shipList, hitList, gridKey);
  const isDisabled = (!(
    (gridKey === 'playerGrid' && gameStage === GameStage.ShipsPlacement)
    || (gridKey === 'opponentGrid' && gameStage === GameStage.Game)
  ));
  return (
    <table className={styles.table}>
      <caption>
        {gridKey === 'playerGrid' ? 'Your Grid' : 'Opponent Grid'}
      </caption>
      <tbody>
        <tr>
          <td className={styles.scip}></td>
          {Array(grid.length).fill(null).map((_, i) => (
            <th scope='col' key={i}>{i + 1}</th>
          ))}
        </tr>
        {grid.map((row, i) => (
          <tr key={i}>
            <th scope='row'>{String.fromCharCode(65 + i)}</th>
            {row.map((cell, j) => (
              <td key={j}>
                <button
                  className={`${styles.cell} ${getClass(cell)}`}
                  onClick={() => handleClick([i, j])}
                  disabled={isDisabled}
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
