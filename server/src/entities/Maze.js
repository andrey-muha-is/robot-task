const { CELL_TYPE, DIRECTION, SPIN_DIRECTION } = require("../constants");
const { Robot } = require("./Robot");

class Maze {
  _map;
  _robot;

  constructor(map) {
    this._map = map;
  }

  get map() {
    return this._map;
  }

  get robot() {
    return this._robot;
  }

  set robot({ x, y, dir }) {
    const cell = this.getCell(x, y);

    if (cell !== CELL_TYPE.FREE_CELL) {
      throw new Error(`Robot can not be placed on cell [${x}, ${y}]`);
    }

    this._robot = new Robot(x, y, dir);
  }

  getCell(x, y) {
    const row = this._map[y];

    return !!row ? row[x] : undefined;
  }

  turnRobot(spin) {
    this.checkRobotExistance();

    // All possible directions in clockwise order
    const DIRECTIONS = [
      DIRECTION.UP,
      DIRECTION.RIGHT,
      DIRECTION.DOWN,
      DIRECTION.LEFT,
    ];
    const currentDir = this.robot.dir;
    const currentDirIndex = DIRECTIONS.indexOf(currentDir);
    let newDirIndex =
      spin === SPIN_DIRECTION.LEFT ? currentDirIndex - 1 : currentDirIndex + 1;

    if (newDirIndex < 0) {
      newDirIndex = DIRECTIONS.length - 1;
    } else if (newDirIndex >= DIRECTIONS.length) {
      newDirIndex = 0;
    }

    this.robot.dir = DIRECTIONS[newDirIndex];
  }

  moveRobot() {
    this.checkRobotExistance();

    const { x, y } = this.getNextRobotCellCoords();
    const cell = this.getCell(x, y);

    if (cell === undefined || cell === CELL_TYPE.WALL) {
      throw new Error(`Robot cannot be moved on cell [${x}, ${y}]`);
    }

    this.robot.x = x;
    this.robot.y = y;
  }

  checkRobotExistance() {
    if (!this.robot) {
      throw new Error(`Robot does not exists`);
    }
  }

  getNextRobotCellCoords() {
    const { x, y } = this.robot;
    let newX = x;
    let newY = y;

    switch (this.robot.dir) {
      case DIRECTION.UP:
        newY -= 1;
        break;
      case DIRECTION.RIGHT:
        newX += 1;
        break;
      case DIRECTION.DOWN:
        newY += 1;
        break;
      case DIRECTION.LEFT:
        newX -= 1;
        break;
      default:
        break;
    }

    return { x: newX, y: newY };
  }

  getCurrentState() {
    this.checkRobotExistance();

    const { x, y, dir } = this.robot;
    const cell = this.getCell(x, y);

    return { x, y, dir, cell };
  }
}

module.exports = {
  Maze,
};
