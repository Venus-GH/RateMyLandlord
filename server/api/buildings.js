const router = require("express").Router();
const { Building, Landlord, Review } = require("../db/models");
module.exports = router;

// GET /api/buildings/search
router.get("/search", async (req, res, next) => {
  try {
    console.log(
      "in GET /api/buildings/search with req.address",
      req.query.address
    );
    console.log("type of req.query.address:", typeof req.query.address);
    const building = await Building.findOne({
      where: {
        address: req.query.address,
      },
      include: Landlord,
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
    console.log("BUILDINGS =>", buildings);
    res.json(buildings);
  } catch (err) {
    next(err);
  }
});
