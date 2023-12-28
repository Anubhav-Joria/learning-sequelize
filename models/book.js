module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        //   defaultValue: "John"
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      publication_year: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      createdAt: true,
      updatedAt: "modifiedAt",
    }
  );
  return Book;
};
