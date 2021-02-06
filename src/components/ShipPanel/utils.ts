import { ShipType, Ship } from 'context/types';
import { ShipTypeState } from './types';

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
