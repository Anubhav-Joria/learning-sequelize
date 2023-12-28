const routes = require("./UserController.js");

module.exports = (app) => {
  app.post("/addUser", routes.CreateUser);
  app.get("/allUsers", routes.ShowAllUsers);
  app.get("/getUser/:id", routes.getUser);
  app.get("/getUserFromQueryString", routes.getUserFromQueryString);
  app.delete("/deleteUser/:id", routes.deleteUser);
  app.patch("/updateUser/:id", routes.updateUser);
  app.get("/practiceQuery", routes.practiceQuery);
  app.get("/getUsersWithBooks", routes.getUsersWithBooks);
};
