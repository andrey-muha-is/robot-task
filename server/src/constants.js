module.exports = {
  DIRECTION: {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3,
  },

  CELL_TYPE: {
    FREE_CELL: 0,
    WALL: 1,
    EXIT: 2,
  },

  SPIN_DIRECTION: {
    LEFT: 0,
    RIGHT: 1,
  },

  mapObjectsMapping: {
    ".": 0,
    w: 1,
    e: 2,
  },

  HTTP_OK: 200,
  HTTP_BAD_REQUEST: 400,
};
