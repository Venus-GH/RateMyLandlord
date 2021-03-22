const Sequelize = require("sequelize");
const Review = require("./review");
const Building = require("./building");
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

Landlord.prototype.getBuildings = async function () {
  const buildings = await Building.findAll({
    where: {
      landlordId: this.id,
    },
  });
  return buildings;
};

Landlord.prototype.getTags = async function () {
  const reviews = await Review.findAll({
    where: {
      landlordId: this.id,
    },
  });

  const flattenTagData = reviews.reduce((accumulator, curr) => {
    return accumulator.concat(curr.tags);
  }, []);

  const countedTagsObj = flattenTagData.reduce((accumulator, currTag) => {
    if (currTag in accumulator) {
      accumulator[currTag]++;
    } else {
      accumulator[currTag] = 1;
    }
    return accumulator;
  }, {});

  const formatTagData = (objArg) => {
    let arr = [];
    let keysArr = Object.keys(objArg);
    let valuesArr = Object.values(objArg);
    for (let i = 0; i < keysArr.length; i++) {
      let obj = {};
      obj.value = keysArr[i];
      obj.count = valuesArr[i];
      arr.push(obj);
    }
    return arr;
  };

  const tagData = formatTagData(countedTagsObj);

  return tagData;
};

Landlord.prototype.getMktAvgs = async function () {
  const reviews = await Review.findAll();
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

  return {
    avgKindness,
    avgResponsiveness,
    avgMaintenance,
    avgPestControl,
  };
};

module.exports = Landlord;
