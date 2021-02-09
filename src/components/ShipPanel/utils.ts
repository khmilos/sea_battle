import { ShipMeta, Ship } from 'context/types';
import { ShipMetaState } from './types';
import styles from './styles.module.css';

export function initStatus(
  shipList: Ship[],
  shipMetaList: ShipMeta[]
): ShipMetaState[] {
  return shipMetaList.map((shipMeta) => {
    const current = shipList.reduce((s, x) => {
      return s + (x.length === shipMeta.size ? 1 : 0);
    }, 0);
    return { ...shipMeta, current };
  });
}

export function getClass(current: number, quantity: number) {
  if (current > quantity) return styles.error;
  if (current === quantity) return styles.ok;
  return ''
}
