const { Sequelize } = require("sequelize");
const db = require("../../models");
const Issue = db.issue;

const GetIssues = async (req, res) => {
  try {
    const issues = await Issue.findAll();
    return res.json({
      status: 200,
      totalIssues: issues.length,
      issues: issues,
      message: "all issues",
    });
  } catch (err) {
    return res.json({
      status: 400,
      message: "Unsuccessful creating book",
      error: err.parent.sqlMessage,
    });
  }
};

const CreateIssue = async (req, res) => {
  try {
    const issue = await Issue.create(req.body);
    return res.json({
      status: 200,
      book: issue,
      message: "Issue created successfully",
    });
  } catch (err) {
    return res.json({
      status: 400,
      message: "Unsuccessful creating issue",
      error: err,
    });
  }
};

const EditIssue = async (req, res) => {
  const id = req.query.id;
  const { newStatus } = req.body;
  try {
    const issue = await Issue.findByPk(id);
    if (!issue) {
      return res.status(404).json({
        status: 404,
        message: "Issue not found",
      });
    }
    issue.status = newStatus;

    await issue.save();

    return res.json({
      status: 200,
      message: "Issue edited successfully",
    });
  } catch (err) {
    return res.json({
      status: 400,
      message: "Unsuccessful editing issue",
      error: err,
    });
  }
};

module.exports = {
  GetIssues,
  CreateIssue,
  EditIssue,
};
