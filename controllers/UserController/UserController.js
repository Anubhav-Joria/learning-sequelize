const { Sequelize } = require("sequelize");
const db = require("../../models");
const User = db.user;

const CreateUser = async (req, res) => {
  const { firstName, lastName } = req.body;
  if (req.body.length > 0) {
    var user = await User.bulkCreate(req.body);
  } else {
    var user = await User.create({ firstName: firstName, lastName: lastName });
  }
  return res.json({
    status: 200,
    message: "User created successfully",
    user: user,
  });
};

const ShowAllUsers = async (req, res) => {
  // Find all users with all cols
  const allUsers = await User.findAll();

  // const allUsers = await User.findAll({
  //   attributes: ["firstName", "lastName"], // specifying cols to show
  // });

  // can also rename using nested array
  return res.json({
    status: 200,
    totalUsers: allUsers.length,
    users: allUsers,
  });
};

const getUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  return res.json({
    status: 200,
    user: user,
  });
};

const getUserFromQueryString = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.query.id,
    },
  });
  return res.json({
    status: 200,
    user: user,
  });
};

const deleteUser = async (req, res) => {
  const user = await User.destroy({
    where: {
      id: req.params.id,
    },
  });
  return res.json({
    status: 200,
    message: "User deleted successfully",
    user: user,
  });
};

const updateUser = async (req, res) => {
  const updatedData = req.body;
  const user = await User.update(updatedData, {
    where: {
      id: req.params.id,
    },
  });
  return res.json({
    status: 200,
    message: "User updated successfully",
    user: user,
  });
};

const practiceQuery = async (req, res) => {
  let response = {};

  try {
    // Find all users with all cols
    // const allUsers = await User.findAll();

    // specifying cols to show
    // const allUsers = await User.findAll({
    //   attributes: ['firstName', 'lastName'],
    // });

    // can also rename using nested array
    // const allUsers = await User.findAll({
    //   attributes: [['firstName', "nickname"], 'lastName'],
    // });

    // to find the count and sum of particular col
    // const allUsers = await User.findAll({
    //   attributes: [
    //     [Sequelize.fn('COUNT', Sequelize.col('firstName')), 'count'],
    //     [Sequelize.fn('SUM', Sequelize.col('id')), 'sum']
    //   ]
    // });

    // Using Order By
    const allUsers = await User.findAll({
      attributes: [
        [Sequelize.fn("COUNT", Sequelize.col("firstName")), "count"],
        [Sequelize.fn("SUM", Sequelize.col("id")), "sum"],
      ],
    });

    response = {
      data: allUsers,
      totalUsers: allUsers.length,
      status: 200,
    };
  } catch (err) {
    console.log(err);
    response = {
      data: err,
      status: 400,
    };
  }

  return res.json(response);
};

module.exports = {
  CreateUser,
  ShowAllUsers,
  getUser,
  getUserFromQueryString,
  deleteUser,
  updateUser,
  practiceQuery,
};
