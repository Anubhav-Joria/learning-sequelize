const { Sequelize } = require("sequelize");
const db = require("../../models");

const Customer = db.customer;
const Profile = db.profile;

const mnAssociation = async (req, res) => {
  try {
    // 1. using lazy loading
    // const amidala = await Customer.create({ username: "p4dm3", points: 1000 });
    // const queen = await Profile.create({ name: "Queen" });
    // await amidala.addProfile(queen, { through: { selfGranted: true } });
    // const result = await Customer.findOne({
    //   where: { username: "p4dm3" },
    //   include: Profile,
    // });

    // 2. using eager loading
    const amidala = await Customer.create(
      {
        username: "p4dm3",
        points: 1000,
        profiles: [
          {
            name: "Queen",
            Grant: {
              selfGranted: true,
            },
          },
        ],
      },
      {
        include: Profile,
      }
    );

    const result = await Customer.findOne({
      where: { username: "p4dm3" },
      include: Profile,
    });

    return res.json({
      status: 200,
      result: result,
    });
  } catch (err) {
    return res.json({
      status: 400,
      error: err,
    });
  }
};

const getCustomProfiles = async (req, res) => {
  try {
    let result = await db.customer.findAll({
      include: [
        {
          model: db.grant,
          include: [Customer, Profile],
        },
        {
          model: Profile,
          include: {
            model: Customer,
            include: {
              model: db.grant,
              include: [Customer, Profile],
            },
          },
        },
      ],
    });

    return res.json({
      status: 200,
      result: result,
    });
  } catch (err) {
    return res.json({
      status: 400,
      error: err,
    });
  }
};

module.exports = {
  mnAssociation,
  getCustomProfiles,
};
