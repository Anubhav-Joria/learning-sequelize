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
db.customer = require("./customer")(sequelize, DataTypes);
db.profile = require("./profile")(sequelize, DataTypes);

// db.user.hasOne(db.contact, {
//   foreignKey: {
//     name: "user_id",
//   },
// }); // To get contact with users

// one to Many relationship
db.user.hasMany(db.contact, {
  foreignKey: {
    name: "user_id",
  },
}); // To get contact with users

db.contact.belongsTo(db.user, {
  foreignKey: {
    name: "user_id",
  },
}); // To get users with contact

db.books = require("./book")(sequelize, DataTypes);
db.issue = require("./issue")(sequelize, DataTypes);

db.user.belongsToMany(db.books, { through: "UserBooks" });
db.books.belongsToMany(db.user, { through: "UserBooks" });

const Grant = sequelize.define(
  "grant",
  {
    selfGranted: DataTypes.BOOLEAN,
  },
  { timestamps: false }
);

db.grant = Grant;

// 1. Many-to-Many association
// db.customer.belongsToMany(db.profile, { through: Grant });
// db.profile.belongsToMany(db.customer, { through: Grant });

// 2. Two One-to-Many Association
// db.customer.hasMany(db.grant);
// db.grant.belongsTo(db.customer);
// db.profile.hasMany(db.grant);
// db.grant.belongsTo(db.profile);

// 3. The Super Many-to-Many relationship
db.customer.belongsToMany(db.profile, { through: db.grant });
db.profile.belongsToMany(db.customer, { through: db.grant });
db.customer.hasMany(db.grant);
db.grant.belongsTo(db.customer);
db.profile.hasMany(db.grant);
db.grant.belongsTo(db.profile);

sequelize.sync({ force: false });

// User.sync(); // create a new user tabl
// Contact.sync(); // create a new contact

module.exports = db;
