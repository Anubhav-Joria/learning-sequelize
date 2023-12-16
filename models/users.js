module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // Model attributes are defined here
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        //   defaultValue: "John"

        //Getter function so that we can get in upper case
        // get() {
        //   const rawValue = this.getDataValue('firstName');
        //   return rawValue ? rawValue.toUpperCase() : null;
        // }
      },
      lastName: {
        type: DataTypes.STRING,
      },
    },
    {
      // Other model options go here
      // timestamps: false, // to remove created at and updated at from table

      // can also use like
      createdAt: true,
      updatedAt: "modifiedAt",
    }
  );
  return User;
};
