const { HTTP_OK, HTTP_BAD_REQUEST } = require("./constants");

module.exports = {
  badRequest(ctx, message) {
    ctx.response.status = HTTP_BAD_REQUEST;
    ctx.response.body = message;
  },
  success(ctx, body) {
    ctx.response.status = HTTP_OK;
    ctx.response.body = body;
  },
};
