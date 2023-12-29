const db = require("../../models");
const User = db.user;
const Contact = db.contact;

const createContact = async (req, res) => {
  try {
    let contacts = await Contact.bulkCreate(req.body);
    return res.json({
      status: 200,
      message: "Contacts created successfully",
      contacts: contacts,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error creating contacts",
      error: error.message,
    });
  }
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

const paranoid = async (req, res) => {
  let response = {};
  try {
    // 1. Query to soft delete a contact
    // response = await Contact.destroy({
    //   where: {
    //     id: 18,
    //   },
    //   force: true,
    // });

    // 2. Query to restore soft deleted contact
    response = await Contact.restore();
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

/**
 * lazy load users and contacts
 */
const lazyLoading = async (req, res) => {
  let response = {};
  try {
    let data = await User.findOne({
      where: {
        id: 2,
      },
    });

    response = { ...response, user: data };
    let contact = await data.getContacts();
    response = { ...response, contact };
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
  paranoid,
  lazyLoading,
};
