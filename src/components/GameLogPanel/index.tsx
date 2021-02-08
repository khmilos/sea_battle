import { useContext } from 'react';
import context from 'context';
import styles from './styles.module.css';

function GameLogPanel() {
  const { state } = useContext(context);
  const { gameLogList } = state;

  return (
    <div className={styles.container}>
      <h2>Game Log</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Made by</th>
              <th scope='col'>Cell</th>
              <th scope='col'>Result</th>
            </tr>
          </thead>
          <tbody>
            {gameLogList.map((row, i) => (
              <tr key={i}>
                <th scope='row'>{i + 1}</th>
                <td>{row.player}</td>
                <td>
                  {String.fromCharCode(65 + row.cell[0])}; {row.cell[1] + 1}
                </td>
                <td>{row.isHit ? 'Hit' : 'Miss'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {gameLogList.length === 0 && (
          <div className={styles.empty}>
            Game log is empty
          </div>
        )}
      </div>
    </div>
  );
}

export default GameLogPanel;
