const koa = require("koa");
const session = require("koa-session");

const routerCreator = require("./src/router");
const { Datasource } = require("./src/datasource");

const app = new koa();
const datasource = new Datasource();
const router = routerCreator(datasource);

app.keys = ["session_keys"];

app.use(session(app));
app.use(router.routes());

app.listen(3000);
