/* eslint-disable complexity */
const router = require("express").Router();
const { Landlord, Review, Building, User } = require("../db/models");
const { Op } = require("sequelize");
module.exports = router;

//GET /api/landlords/:id
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const singleLandlord = await Landlord.findOne({
      where: { id: id },
      include: {
        model: Review,
        include: [User, Building],
      },
    });
    const avgs = await singleLandlord.getAverages();
    singleLandlord.dataValues.avgs = avgs;
    const mktAvgs = await singleLandlord.getMktAvgs();
    singleLandlord.dataValues.mktAvgs = mktAvgs;
    const buildings = await singleLandlord.getBuildings();
    singleLandlord.dataValues.buildings = buildings;
    const tags = await singleLandlord.getTags();
    singleLandlord.dataValues.tags = tags;
    res.json(singleLandlord);
  } catch (error) {
    next(error);
  }
});

/*
// GET /api/landlords/
router.get("/", async (req, res, next) => {
  try {
    let allLandlords = await Landlord.findAll({
      include: [Review, Building],
    });

    let newLandlordsArr = [];
    for (let i = 0; i < allLandlords.length; i++) {
      const landlord = allLandlords[i];
      const avgs = await landlord.getAverages();
      landlord.dataValues.avgs = avgs;
      newLandlordsArr.push(landlord);
    }
    if (req.query.filterBy) {
      let grade = "";
      if (req.query.filterBy === "1") {
        grade = "A";
      }
      if (req.query.filterBy === "2") {
        grade = "B";
      }
      if (req.query.filterBy === "3") {
        grade = "C";
      }
      if (req.query.filterBy === "4") {
        grade = "D";
      }
      if (req.query.filterBy === "5") {
        grade = "F";
      }
      if (req.query.filterBy === "all") {
        res.json(newLandlordsArr);
      } else {
        newLandlordsArr = newLandlordsArr.filter((landlord) => {
          console.log(
            "landlord.avgs.avgGrade",
            landlord.dataValues.avgs.avgGrade
          );
          if (landlord.dataValues.avgs.avgGrade === grade) {
            return landlord;
          }
        });

        res.json(newLandlordsArr);
      }
    } else {
      res.json(newLandlordsArr);
    }
  } catch (err) {
    next(err);
  }
});
*/

const orderBy = (order, landlords) => {
  if (order === "grade") {
    return landlords.sort((a, b) =>
      a.avgs.avgGrade < b.avgs.avgGrade ? -1 : 1
    );
  }
  if (order === "kindness") {
    return landlords.sort((a, b) =>
      a.avgs.avgKindness > b.avgs.avgKindness ? -1 : 1
    );
  }
  if (order === "maintenance") {
    return landlords.sort((a, b) =>
      a.avgs.avgMaintenance > b.avgs.avgMaintenance ? -1 : 1
    );
  }
  if (order === "responsiveness") {
    return landlords.sort((a, b) =>
      a.avgs.avgResponsiveness > b.avgs.avgResponsiveness ? -1 : 1
    );
  }
  if (order === "pest-control") {
    return landlords.sort((a, b) =>
      a.avgs.avgPestControl > b.avgs.avgPestControl ? -1 : 1
    );
  }
  if (order === "most-reviews") {
    return landlords.sort((a, b) =>
      a.reviews.length > b.reviews.length ? -1 : 1
    );
  }
  if (order === "least-reviews") {
    return landlords.sort((a, b) =>
      a.reviews.length < b.reviews.length ? -1 : 1
    );
  }
};

const filterBy = (filters, landlords) => {
  console.log("in filterBy:", filters, landlords);
  const filtersArr = filters.includes(",") ? filters.split(",") : [filters];
  let filtered = landlords;
  if (filtersArr.some((filter) => ["A", "B", "C", "D", "F"].includes(filter))) {
    filtered = landlords.filter((landlord) =>
      filtersArr.includes(landlord.avgs.avgGrade)
    );
  }
  if (filtersArr.includes("true") && filtersArr.includes("false")) {
    return filtered;
  } else if (filtersArr.includes("true") || filtersArr.includes("false")) {
    let thisFilter = filtersArr.find((filter) => filter.length > 1);
    let otherFilter = thisFilter === "true" ? "false" : "true";
    filtered = filtered.filter(
      (landlord) =>
        landlord.avgs.avgWouldRecommend[thisFilter] >
        landlord.avgs.avgWouldRecommend[otherFilter]
    );
  }
  return filtered;
};

// GET /api/landlords/
router.get("/", async (req, res, next) => {
  try {
    let allLandlords = await Landlord.findAll({
      include: Review,
    });
    let newLandlordsArr = [];
    for (let i = 0; i < allLandlords.length; i++) {
      const singleLandlord = allLandlords[i];
      const avgs = await singleLandlord.getAverages();
      singleLandlord.dataValues.avgs = avgs;
      newLandlordsArr.push(singleLandlord.dataValues);
    }
    if (req.query.order) {
      newLandlordsArr = orderBy(req.query.order, newLandlordsArr);
    }
    if (req.query.filters) {
      newLandlordsArr = filterBy(req.query.filters, newLandlordsArr);
    }

    res.json(newLandlordsArr);
  } catch (error) {
    console.log("there was an error in GET /api/landlords/");
    next(error);
  }
});
