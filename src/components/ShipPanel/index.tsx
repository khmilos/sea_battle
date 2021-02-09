import { useContext } from 'react';
import context from 'context';
import { initStatus, getClass } from './utils';
import styles from './styles.module.css';

function ShipPanel() {
  const { state } = useContext(context);
  const shipMetaList = Object.values(state.gameSettings.shipMetaList);
  const { shipList } = state.playerGrid;
  const shipStateList = initStatus(shipList, shipMetaList);
  return (
    <div className={styles.container}>
      <h2>Place Your Ships</h2>
      <ul className={styles.list}>
        {shipStateList.map(({name, current, quantity}, i) => (
          <li
            key={i}
            className={`${styles.item} ${getClass(current, quantity)}`}
          >
            <span>{name}</span>
            <span>{current} / {quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShipPanel;
