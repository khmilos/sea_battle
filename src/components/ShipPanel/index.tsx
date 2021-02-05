import React, { useContext } from 'react';
import context from 'context';
import styles from './styles.module.css';

function ShipPanel() {
  const { state } = useContext(context);
  const { shipList } = state.playerGrid;
  const shipTypeList = Object.values(state.gameSettings.shipTypeList)
    .map((shipType) => {
      const current = shipList.reduce((s, x) => {
        return s + (x.length === shipType.size ? 1 : 0);
      }, 0);
      return { ...shipType, current };
    });

  return (
    <div className={styles.container}>
      {shipTypeList.map((shipType, i) => (
        <div key={i} className={styles.row}>
          <span>{shipType.name}</span>
          <span>{shipType.current} / {shipType.quantity}</span>
        </div>
      ))}
    </div>
  );
}

export default ShipPanel;
