module.exports = (app) => {
  require("./UserController/index")(app);
  require("./BookController/index")(app);
  require("./IssueController/index")(app);
  require("./ContactController/index")(app);
};
