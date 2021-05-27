const Router = require("koa-router");
const koaBody = require("koa-body");

const {
  saveMapMiddleware,
  initMapHandler,
  setRobotHandler,
  moveRobotHandler,
  turnRobotHandler,
} = require("./handlers");

module.exports = function (datasource) {
  const router = new Router();

  router.post(
    "/init/:fileName",
    koaBody(),
    saveMapMiddleware,
    initMapHandler(datasource)
  );
  router.get("/set", setRobotHandler(datasource));
  router.get("/move", moveRobotHandler(datasource));
  router.get("/turn", turnRobotHandler(datasource));

  return router;
};
