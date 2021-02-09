import { Ship, ShipType, Cell } from './types';

export function findShip(shipList: Ship[], cell: Cell) {
  return shipList.findIndex((ship) => {
    return ship.find((x) => x[0] === cell[0] && x[1] === cell[1]);
  });
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
  shipTypeList: ShipType[]
) {
  const sizeList = shipList.map((ship) => ship.length);
  const sizeQuantityDict = sizeList
    .reduce<{ [key: number]: number }>((result, length) => {
      return { ...result, [length]: (result[length] || 0) + 1 };
    }, {});
  const isValid = shipTypeList.reduce((result, shipType) => {
    return result && sizeQuantityDict[shipType.size] === shipType.quantity;
  }, true);
  return isValid;
}
