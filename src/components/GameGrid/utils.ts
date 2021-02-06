import { Ship, GridKey } from 'context/types';
import { findShip } from 'context/utils';
import { CellType } from './types';
import styles from './styles.module.css';

export function initGrid(shipList: Ship[], gridKey: GridKey) {
  return Array(10).fill(null).map((_, i) => {
    return Array(10).fill(null).map((_, j) => {
      if (findShip(shipList, [i, j]) !== -1) return CellType.Ship;
      return gridKey === 'opponentGrid' ? CellType.Unknown : CellType.Empty;
    });
  });
}

export function getClass(cell: CellType) {
  switch (cell) {
    case CellType.Empty: return styles.empty;
    case CellType.Ship: return styles.ship;
    case CellType.Unknown: return styles.unkown;
    default: return styles.empty;
  }
}
