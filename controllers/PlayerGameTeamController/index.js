const routes = require("./PlayerGameTeamController.js");

module.exports = (app) => {
  app.get("/createManyAssociation", routes.createManyAssociation);
  app.get("/getManyAssociation", routes.getManyAssociation);
};
