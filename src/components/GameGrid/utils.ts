import { Ship, Cell, GridKey, GameStage } from 'context/types';
import { findShip } from 'context/utils';
import { addShip, gameFlow, removeShip } from 'context/actions';
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
      return CellType.Empty;
    });
  });
}

export function getClass(cell: CellType) {
  switch (cell) {
    case CellType.Empty: return styles.empty;
    case CellType.Ship: return styles.ship;
    case CellType.Miss: return styles.miss;
    case CellType.Hit: return styles.hit;
    default: return styles.empty;
  }
}

export function playerGridHandler(shipList: Ship[]) {
  return (cell: Cell) => {
    if (findShip(shipList, cell) === -1) return addShip(cell);
    return removeShip(cell);
  };
}

export function opponentGridHandler(hitList: Cell[]) {
  return (cell: Cell) => {
    if (isMoveHasBeen(hitList, cell)) return () => {};
    return gameFlow(cell);
  };
}

export function isMoveHasBeen(hitList: Cell[], cell: Cell) {
  return hitList.find((hit) => {
    return hit[0] === cell[0] && hit[1] === cell[1]
  });
}

export function checkIsDisabled(gridKey: GridKey, gameStage: GameStage) {
  if (gridKey === 'playerGrid' && gameStage === GameStage.ShipsPlacement) {
    return false;
  }
  if (gridKey === 'opponentGrid' && gameStage === GameStage.Game) {
    return false;
  }
  return true;
}
