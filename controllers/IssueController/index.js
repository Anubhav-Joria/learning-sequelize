const routes = require("./IssueController.js")

module.exports = (app) => {
    app.get("/getIssues", routes.GetIssues);
    app.post("/createIssue", routes.CreateIssue);
    app.patch("/editIssue", routes.EditIssue);
} 