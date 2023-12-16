const { Sequelize, DataTypes } = require("sequelize");
const USER_NAME = process.env.USER_NAME;
const DB = process.env.DATABASE;
const PASSWORD = process.env.PASSWORD;

const sequelize = new Sequelize(DB, USER_NAME, PASSWORD, {
  host: "localhost",
  logging: false, // to remove logs
  dialect: "mysql",
});

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
connectToDB();

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.user = require("./users")(sequelize, DataTypes);
db.contact = require("./contacts")(sequelize, DataTypes);
db.books = require("./book")(sequelize, DataTypes);
db.issue = require("./issue")(sequelize, DataTypes);

sequelize.sync({ force: false });

// User.sync(); // create a new user tabl
// Contact.sync(); // create a new contact

module.exports = db;
