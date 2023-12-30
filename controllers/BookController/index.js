const routes = require("./BookController.js");

module.exports = (app) => {
  app.post("/createBook", routes.CreateBook);
  app.get("/orderBy", routes.PracticeOrderBy);
  app.get("/getBooks", routes.getBooks);
  app.get("/getBooksMetaData", routes.getBooksMetaData);
};
