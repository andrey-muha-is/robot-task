class Robot {
  _x; _y; _dir;

  constructor(x = 0, y = 0, dir = DIRECTION.DOWN) {
    this._x = x;
    this._y = y;
    this._dir = dir;
  }

  get x() {
    return this._x;
  }

  set x(val) {
    this._x = val;
  }

  get y() {
    return this._y;
  }

  set y(val) {
    this._y = val;
  }

  get dir() {
    return this._dir;
  }

  set dir(val) {
    this._dir = val;
  }
}

module.exports = {
  Robot
};