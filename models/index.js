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

// Many to many to many relationship
db.player = sequelize.define("Player", { username: DataTypes.STRING });
db.team = sequelize.define("Team", { name: DataTypes.STRING });
db.game = sequelize.define("Game", { name: DataTypes.STRING });

// Super Many-to-Many relationship between Game and Team
db.gameTeam = sequelize.define("GameTeam", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});
db.team.belongsToMany(db.game, { through: db.gameTeam });
db.game.belongsToMany(db.team, { through: db.gameTeam });
db.gameTeam.belongsTo(db.game);
db.gameTeam.belongsTo(db.team);
db.game.hasMany(db.gameTeam);
db.team.hasMany(db.gameTeam);

// Super Many-to-Many relationship between Player and GameTeam
db.playerGameTeam = sequelize.define("PlayerGameTeam", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});
db.player.belongsToMany(db.gameTeam, { through: db.playerGameTeam });
db.gameTeam.belongsToMany(db.player, { through: db.playerGameTeam });
db.playerGameTeam.belongsTo(db.player);
db.playerGameTeam.belongsTo(db.gameTeam);
db.player.hasMany(db.playerGameTeam);
db.gameTeam.hasMany(db.playerGameTeam);

sequelize.sync({ force: false });

// User.sync(); // create a new user tabl
// Contact.sync(); // create a new contact

module.exports = db;
