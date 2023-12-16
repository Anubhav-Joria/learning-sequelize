module.exports = (sequelize, DataTypes) => {
  const Issue = sequelize.define(
    "issue",
    {
      summary: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      projectName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["TO-DO", "IN-PROGRESS", "DEV-DONE"]],
        },
      },
    },
    {
      createdAt: true,
      updatedAt: true,
    }
  );
  return Issue;
};
