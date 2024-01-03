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

      // 1. Defining hooks
      // hooks: {
      //   beforeValidate: (user, options) => {
      //     console.log("beforeValidate", user);
      //     user.firstName = "happy";
      //   },
      //   afterValidate: (user, options) => {
      //     console.log("afterValidate", user);
      //     user.lastName = "prince";
      //   },
      // },
    }
  );

  // Method 2
  // User.addHook("beforeValidate", "customName", (user, options) => {
  //   user.firstName = "sad";
  //   user.lastName = "King";
  // });

  // Method - 3
  User.beforeValidate((user, options) => {
    user.firstName = "Great";
    user.lastName = "King";
  });

  return User;
};
