const { Sequelize } = require("sequelize");
const db = require("../../models");
const Book = db.books;
const User = db.user;
const Contact = db.contact;

const CreateBook = async (req, res) => {
  try {
    if (req.body?.length > 0) {
      var book = await Book.bulkCreate(req.body);
    } else {
      var book = await Book.create(req.body);
    }
    return res.json({
      status: 200,
      message: "Book created successfully",
      book: book,
    });
  } catch (err) {
    return res.json({
      status: 400,
      message: "Unsuccessful creating book",
      error: err.parent.sqlMessage,
    });
  }
};

const getBooks = async (req, res) => {
  const { start, pageSize } = req?.query;
  const options = {};
  if (start && pageSize) {
    options.offset = Number(start) - 1;
    options.limit = Number(pageSize);
  }
  try {
    const books = await Book.findAll(options);
    return res.json({
      status: 200,
      book: books,
    });
  } catch (err) {
    return res.json({
      status: 400,
      message: "Unsuccessful creating book",
      error: err.parent.sqlMessage,
    });
  }
};

/**
 * Query to get data from different tables
 * @returns Books with Associated Users and their associated contact information
 */
const getBooksMetaData = async (req, res) => {
  try {
    const books = await Book.findAll({
      attributes: ["title", "author", "price"],
      include: {
        model: User,
        through: { attributes: [] }, // Exclude junction table data (UserBooks)

        attributes: ["firstName", "lastName"],
        include: {
          model: Contact,
          attributes: ["address", "phoneNumber"],
        },
      },
    });
    return res.json({
      status: 200,
      book: books,
    });
  } catch (err) {
    return res.json({
      status: 400,
      error: err,
    });
  }
};

const PracticeOrderBy = async (req, res) => {
  try {
    // 1 :
    // const books = await Book.findAll({
    //   attributes: ["title", "price"],
    //   order: [
    //     ["title", "DESC"],
    //   ],
    // });

    // 2 : this groups the books on the basis of price then return the max title obj for each price
    // const books = await Book.findAll({
    //   attributes: [
    //     [Sequelize.fn('MAX', Sequelize.col('title')), 'title'], // Get the title with the highest price in each group
    //     'price', // Select the "price" column as is
    //   ],
    //   group: 'price'
    // });

    return res.json({
      status: 200,
      book: books,
    });
  } catch (err) {
    return res.json({
      status: 400,
      message: "Unsuccessful creating book",
      error: err.parent.sqlMessage,
    });
  }
};

module.exports = {
  CreateBook,
  PracticeOrderBy,
  getBooks,
  getBooksMetaData,
};
