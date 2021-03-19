const router = require("express").Router();
const { Building } = require("../db/models");
module.exports = router;

// GET /api/buildings/search
router.get("/search", async (req, res, next) => {
  try {
    const building = await Building.findOne({
      where: {
        address: req.query.address,
      },
    });
    res.json(building);
  } catch (error) {
    next(error);
  }
});
