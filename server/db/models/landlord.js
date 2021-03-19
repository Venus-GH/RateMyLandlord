const Sequelize = require("sequelize");
const Review = require("./review");
const db = require("../db");

const Landlord = db.define("landlord", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: "Must enter a Landlord name.",
      },
    },
  },
});

Landlord.prototype.getAverages = async function () {
  console.log("in instance method", this);
  const reviews = await Review.findAll({
    where: {
      landlordId: this.id,
    },
  });
  const grades = {
    5: "A",
    4: "B",
    3: "C",
    2: "D",
    1: "F",
  };
  const avgGrade =
    grades[
      Math.floor(
        reviews.reduce((accum, current) => accum + current.grade, 0) /
          reviews.length
      )
    ];
  const avgKindness =
    reviews.reduce((accum, current) => accum + current.kindness, 0) /
    reviews.length;
  const avgResponsiveness =
    reviews.reduce((accum, current) => accum + current.responsiveness, 0) /
    reviews.length;
  const avgMaintenance =
    reviews.reduce((accum, current) => accum + current.maintenance, 0) /
    reviews.length;
  const avgPestControl =
    reviews.reduce((accum, current) => accum + current.pestControl, 0) /
    reviews.length;
  const avgWouldRecommend = reviews.reduce(
    (accum, current) => {
      if (current.wouldRecommend) accum.true++;
      else accum.false++;
      return accum;
    },
    { true: 0, false: 0 }
  );

  return {
    avgGrade,
    avgKindness,
    avgResponsiveness,
    avgMaintenance,
    avgPestControl,
    avgWouldRecommend,
  };
};

module.exports = Landlord;
