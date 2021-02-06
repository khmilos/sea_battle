import React, { useContext } from 'react';
import context from 'context';
import { initStatus } from './utils';
import styles from './styles.module.css';

function ShipPanel() {
  const { state } = useContext(context);
  const shipTypeList = Object.values(state.gameSettings.shipTypeList);
  const { shipList } = state.playerGrid;
  const shipStateList = initStatus(shipList, shipTypeList);
  return (
    <div className={styles.container}>
      {shipStateList.map((shipType, i) => (
        <div key={i} className={styles.row}>
          <span>{shipType.name}</span>
          <span>{shipType.current} / {shipType.quantity}</span>
        </div>
      ))}
    </div>
  );
}

export default ShipPanel;
