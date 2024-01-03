const routes = require("./CustomerController.js");

module.exports = (app) => {
  app.get("/m-n-association", routes.mnAssociation);
  app.get("/getCustomProfiles", routes.getCustomProfiles);
};
