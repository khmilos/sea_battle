import { useContext } from 'react';
import context from 'context';
import { addShip, removeShip, gameFlow } from 'context/actions';
import { Cell, GameStage, GridKey } from 'context/types';
import { findShip } from 'context/utils';
import { initGrid, getClass, isMoveHasBeen } from './utils';
import styles from './styles.module.css';

function GameGrid({ gridKey }: { gridKey: GridKey }) {
  const { state, dispatch } = useContext(context);
  const { gameStage } = state;
  const { shipList, hitList } = state[gridKey];
  
  let handleClick = (cell: Cell) => {};
  if (gridKey === 'playerGrid' && gameStage === GameStage.ShipsPlacement) {
    handleClick = (cell: Cell) => {
      if (findShip(shipList, cell) === -1) return dispatch(addShip(cell));
      return dispatch(removeShip(cell));
    }
  } else if (
    gridKey === 'opponentGrid' && gameStage === GameStage.Game
  ) {
    handleClick = (cell: Cell) => {
      if (isMoveHasBeen(hitList, cell)) return;
      dispatch(gameFlow(cell));
    }
  }


  const grid = initGrid(shipList, hitList, gridKey);
  const isDisabled = (!(
    (gridKey === 'playerGrid' && gameStage === GameStage.ShipsPlacement)
    || (gridKey === 'opponentGrid' && gameStage === GameStage.Game)
  ));
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
