const db = require("../../models");
const User = db.user;
const Contact = db.contact;

const createContact = async (req, res) => {
  let contact = await Contact.create(req.body);
  return res.json({
    status: 200,
    message: "Contact created successfully",
    contact: contact,
  });
};

const getContact = async (req, res) => {
  let response = {};
  try {
    // 1. Query to get all users with their associated contact information
    // response = await User.findAll({
    //   include: Contact,
    // });

    // 2. Query to get only desired columns in the response
    // response = await User.findAll({
    //   attributes: ["firstName", "lastName"],
    //   include: [
    //     {
    //       model: Contact,
    //       attributes: ["address", "phoneNumber"],
    //     },
    //   ],
    // });

    // 3. Query to get all contact with associated users
    response = await Contact.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
  } catch (err) {
    console.log("err", err);
    return res.json({
      status: 200,
      Error: err,
    });
  }

  return res.json({
    status: 200,
    response,
  });
};

const getContactOneToMany = async (req, res) => {
  let response = {};
  try {
    // Query to get User with their Associated Columns
    response = await User.findAll({
      attributes: ["firstName", "lastName"],
      include: [
        {
          model: Contact,
          attributes: ["address", "phoneNumber"],
        },
      ],
    });
  } catch (err) {
    return res.json({
      status: 200,
      Error: err,
    });
  }

  return res.json({
    status: 200,
    response,
  });
};

module.exports = {
  createContact,
  getContact,
  getContactOneToMany,
};
