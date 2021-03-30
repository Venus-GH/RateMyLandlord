const router = require("express").Router();
const { Building, Landlord, Review } = require("../db/models");
module.exports = router;

// GET /api/buildings/search
router.get("/search", async (req, res, next) => {
  try {
    const building = await Building.findOne({
      where: {
        address: req.query.address,
      },
      include: [
        Landlord,
        {
          model: Review,
          include: [Building],
        },
      ],
    });
    res.json(building);
  } catch (error) {
    next(error);
  }
});

//GET /api/buildings => returns all buildings in database
router.get("/", async (req, res, next) => {
  try {
    const buildings = await Building.findAll();
    res.json(buildings);
  } catch (err) {
    next(err);
  }
});
