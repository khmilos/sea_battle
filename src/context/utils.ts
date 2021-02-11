import { Ship, ShipMeta, Cell } from './types';

export function findShip(shipList: Ship[], cell: Cell) {
  return shipList.findIndex((ship) => {
    return ship.find((x) => x[0] === cell[0] && x[1] === cell[1]);
  });
}

export function findHit(hitList: Cell[], cell: Cell) {
  return hitList.findIndex((hit) => hit[0] === cell[0] && hit[1] === cell[1]);
}

export function findAdjacentShips(shipList: Ship[], cell: Cell) {
  return [
    findShip(shipList, [cell[0], cell[1] + 1]),
    findShip(shipList, [cell[0], cell[1] - 1]),
    findShip(shipList, [cell[0] + 1, cell[1]]),
    findShip(shipList, [cell[0] - 1, cell[1]]),
  ].filter((x) => x !== -1);
}

export function isDiagonallyAdjacent(shipList: Ship[], cell: Cell) {
  return [
    findShip(shipList, [cell[0] - 1, cell[1] - 1]),
    findShip(shipList, [cell[0] - 1, cell[1] + 1]),
    findShip(shipList, [cell[0] + 1, cell[1] - 1]),
    findShip(shipList, [cell[0] + 1, cell[1] + 1]),
  ].filter((x) => x !== -1).length > 0;
}

export function isShipPlacementValid(
  shipList: Ship[],
  shipMetaList: ShipMeta[]
) {
  const sizeList = shipList.map((ship) => ship.length);
  const sizeQuantityDict = sizeList
    .reduce<{ [key: number]: number }>((result, length) => {
      return { ...result, [length]: (result[length] || 0) + 1 };
    }, {});
  const isValid = shipMetaList.reduce((result, shipType) => {
    return result && sizeQuantityDict[shipType.size] === shipType.quantity;
  }, true);
  return isValid;
}

export function isDefeat(shipList: Ship[], hitList: Cell[]) {
  return !shipList.find((ship) => {
    return ship.find((cell) => {
      return findHit(hitList, cell) === -1;
    });
  });
}
