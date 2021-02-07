import { Ship, Cell, GridKey } from 'context/types';
import { findShip } from 'context/utils';
import { CellType } from './types';
import styles from './styles.module.css';

export function initGrid(shipList: Ship[], hitList: Cell[], gridKey: GridKey) {
  return Array(10).fill(null).map((_, i) => {
    return Array(10).fill(null).map((_, j) => {
      const isShip = findShip(shipList, [i, j]) !== -1;
      const isHit = hitList.find((cell) => cell[0] === i && cell[1] === j);
      if (isShip && isHit) return CellType.Hit;
      if (isShip) return CellType.Ship;
      if (isHit) return CellType.Miss;
      return gridKey === 'opponentGrid' ? CellType.Unknown : CellType.Empty;
    });
  });
}

export function getClass(cell: CellType) {
  switch (cell) {
    case CellType.Empty: return styles.empty;
    case CellType.Ship: return styles.ship;
    case CellType.Unknown: return styles.unkown;
    case CellType.Miss: return styles.miss;
    case CellType.Hit: return styles.hit;
    default: return styles.empty;
  }
}
