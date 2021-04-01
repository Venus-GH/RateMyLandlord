const Sequelize = require("sequelize");
const db = require("../db");

const Review = db.define("review", {
  grade: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  responsiveness: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: {
        args: [5],
        msg: "Landlord responsiveness rating must be less than 5.",
      },
      min: {
        args: [0],
        msg: "Landlord responsiveness rating must be greater than 0.",
      },
      isInt: {
        msg: "Landlord responsiveness rating must be an integer.",
      },
    },
  },
  pestControl: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: {
        args: [5],
        msg: "Pest control rating must be less than 5.",
      },
      min: {
        args: [0],
        msg: "Pest control rating must be greater than 0.",
      },
      isInt: {
        msg: "Pest control rating must be an integer.",
      },
    },
  },
  kindness: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: {
        args: [5],
        msg: "Landlord kindness rating must be less than 5.",
      },
      min: {
        args: [0],
        msg: "Landlord kindness rating must be greater than 0.",
      },
      isInt: {
        msg: "Landlord kindness rating must be an integer.",
      },
    },
  },
  maintenance: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: {
        args: [5],
        msg: "Landlord maintenance rating must be less than 5.",
      },
      min: {
        args: [0],
        msg: "Landlord maintenance rating must be greater than 0.",
      },
      isInt: {
        msg: "Landlord maintenance rating must be an integer.",
      },
    },
  },

  comments: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  wouldRecommend: {
    type: Sequelize.BOOLEAN,
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  allowContact: {
    type: Sequelize.BOOLEAN,
  },
  thumbsUp: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  thumbsDown: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Review;
