import { ShipType, Ship } from 'context/types';
import { ShipTypeState } from './types';
import styles from './styles.module.css';

export function initStatus(
  shipList: Ship[],
  shipTypeList: ShipType[]
): ShipTypeState[] {
  return shipTypeList.map((shipType) => {
    const current = shipList.reduce((s, x) => {
      return s + (x.length === shipType.size ? 1 : 0);
    }, 0);
    return { ...shipType, current };
  });
}

export function getClass(current: number, quantity: number) {
  if (current > quantity) return styles.error;
  if (current === quantity) return styles.ok;
  return ''
}
