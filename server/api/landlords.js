/* eslint-disable complexity */
const router = require("express").Router();
const { Landlord, Review, Building, User } = require("../db/models");

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
      newLandlordsArr = newLandlordsArr.filter((landlord) => {
        console.log(
          "landlord.avgs.avgGrade",
          landlord.dataValues.avgs.avgGrade
        );
        if (landlord.dataValues.avgs.avgGrade === grade) {
          return landlord;
        }
      });
    }
    res.json(newLandlordsArr);
  } catch (err) {
    next(err);
  }
});
