import { useContext } from 'react';
import context from 'context';
import { Cell, GridKey } from 'context/types';
import {
  initGrid,
  getClass,
  playerGridHandler,
  opponentGridHandler,
  checkIsDisabled,
} from './utils';
import styles from './styles.module.css';

function GameGrid({ gridKey }: { gridKey: GridKey }) {
  const { state, dispatch } = useContext(context);
  const { gameStage } = state;
  const { shipList, hitList } = state[gridKey];
  const grid = initGrid(shipList, hitList, gridKey);
  const isDisabled = checkIsDisabled(gridKey, gameStage);
  const handler = (gridKey === 'playerGrid')
    ? playerGridHandler(shipList)
    : opponentGridHandler(hitList);
  const handleClick = (cell: Cell) => {
    if (handler && handler(cell)) return dispatch(handler(cell));
  };
  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <td className={styles.skip}></td>
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
