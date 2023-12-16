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
    },
    {
      // Other model options go here
      // timestamps: false, // to remove created at and updated at from table

      // can also use like
      createdAt: true,
      updatedAt: "modifiedAt",
    }
  );
  return Contact;
};
