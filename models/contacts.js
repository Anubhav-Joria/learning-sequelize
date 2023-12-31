module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    "contacts",
    {
      // Model attributes are defined here
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        //   defaultValue: "John"
      },
      phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: DataTypes.INTEGER, // should be like userId for default assocation
    },
    {
      // Other model options go here
      // timestamps: false, // to remove created at and updated at from table

      // can also use like
      createdAt: true,
      updatedAt: "modifiedAt",
      paranoid: true, // Added the paranoid option for soft deletes, means it will still be visible in the table with deletedAt not null
    }
  );
  return Contact;
};
