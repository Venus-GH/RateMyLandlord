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
        include: User
      }
    });
    const avgs = await singleLandlord.getAverages();
    singleLandlord.dataValues.avgs = avgs;
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
      include: [Review, Building]
    });
    let newLandlordsArr = [];
    for (let i = 0; i < allLandlords.length; i++) {
      const landlord = allLandlords[i];
      const avgs = await landlord.getAverages();
      landlord.dataValues.avgs = avgs;
      newLandlordsArr.push(landlord);
    }
    res.json(newLandlordsArr);
  } catch (err) {
    next(err);
  }
});
