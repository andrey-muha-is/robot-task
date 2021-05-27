const path = require("path");
const fs = require("fs").promises;
const uuid = require("uuid").v4;

const { badRequest, success } = require("./utils");
const { mapObjectsMapping, SPIN_DIRECTION, DIRECTION } = require("./constants");
const { Maze } = require("./entities/Maze");

const saveMapMiddleware = async (ctx, next) => {
  const { fileName = "map.txt" } = ctx.params || {};
  const file = ctx.request.body
  const savePath = path.resolve(__dirname, "../maps", fileName);
  
  await fs.writeFile(savePath, file, { encoding: "utf8" });

  next();
};

const initMapHandler = (datasource) => (ctx, next) => {
  const mapRows = (ctx.request.body || "").split(/\r\n/);

  // no mapRows or different mapRows length validation
  if (
    !mapRows ||
    !mapRows.length ||
    mapRows.some((i) => i.length !== mapRows[0].length)
  ) {
    badRequest(ctx, `Invalid map format`);
  } else {
    const map = mapRows.map((row) =>
      row.split("").map((char) => mapObjectsMapping[char.toLowerCase()])
    );
    const userId = uuid();
    datasource.initUserData(userId, new Maze(map));

    // init session
    ctx.session.userId = userId;
    success(ctx, map);
  }

  next();
};

const setRobotHandler = (datasource) => (ctx, next) => {
  const { userId } = ctx.session;
  const data = datasource.getUserData(userId);

  if (!data) {
    badRequest(ctx, `Map is not initialized`);
  } else {
    const { x, y, dir = DIRECTION.UP } = ctx.query;
    const { maze } = data;

    try {
      maze.robot = { x: Number(x), y: Number(y), dir: Number(dir) };
      datasource.updateUserData(userId, maze);
      success(ctx, maze.getCurrentState());
    } catch (e) {
      badRequest(ctx, e.message);
    }
  }

  next();
};

const moveRobotHandler = (datasource) => (ctx, next) => {
  const { userId } = ctx.session;
  const data = datasource.getUserData(userId);

  if (!data) {
    badRequest(ctx, `Map is not initialized`);
  } else {
    const { maze } = data;

    try {
      maze.moveRobot();
      datasource.updateUserData(userId, maze);
      success(ctx, maze.getCurrentState());
    } catch (e) {
      badRequest(ctx, e.message);
    }
  }

  next();
};

const turnRobotHandler = (datasource) => (ctx, next) => {
  const { userId } = ctx.session;
  const data = datasource.getUserData(userId);
  const validSpins = ["left", "right"];
  const { spin } = ctx.query;

  if (!data) {
    badRequest(ctx, `Map is not initialized`);
  } else if (!spin || !validSpins.includes(spin.toLowerCase())) {
    badRequest(ctx, `Invalid spin: '${spin}'`);
  } else {
    const { maze } = data;

    try {
      const spinDir = SPIN_DIRECTION[spin.toUpperCase()];
      maze.turnRobot(spinDir);
      datasource.updateUserData(userId, maze);
      success(ctx, maze.getCurrentState());
    } catch (e) {
      badRequest(ctx, e.message);
    }
  }

  next();
};

module.exports = {
  saveMapMiddleware,
  initMapHandler,
  setRobotHandler,
  moveRobotHandler,
  turnRobotHandler,
};
