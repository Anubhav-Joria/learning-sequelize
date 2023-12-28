const routes = require("./ContactController.js");

module.exports = (app) => {
  app.post("/createContact", routes.createContact);
  app.get("/getContact", routes.getContact);
  app.get("/getContactManyToOne", routes.getContactOneToMany);
};
