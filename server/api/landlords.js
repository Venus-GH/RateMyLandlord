const router = require("express").Router();
const { Landlord, Review, Building } = require("../db/models");
module.exports = router;

//GET /api/landlords/:id
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const singleLandlord = await Landlord.findOne({
      where: { id: id },
      include: [Review, Building]
    });
    const avgs = await singleLandlord.getAverages();
    singleLandlord.dataValues.avgs = avgs;
    res.json(singleLandlord);
  } catch (error) {
    next(error);
  }
});

// GET /api/landlords/
router.get("/", async (req, res, next) => {
  try {
    const allLandlords = await Landlord.findAll({
      include: [Review, Building]
    });
    res.json(allLandlords);
  } catch (err) {
    next(err);
  }
});
