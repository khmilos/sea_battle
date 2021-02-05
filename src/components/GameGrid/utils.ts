import { CellType } from './types';
import styles from './styles.module.css';

export function getClass(cell: CellType) {
  switch (cell) {
    case CellType.Empty: return styles.empty;
    case CellType.Ship: return styles.ship;
    default: return styles.empty;
  }
}
