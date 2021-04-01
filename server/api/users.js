const router = require("express").Router();
const { User, Review, Building, Landlord } = require("../db/models");
module.exports = router;

// GET /api/users/
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email", "preferredName"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:id/reviews
router.get("/:id/reviews", async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: { userId: req.params.id },
      include: [Building, Landlord, User],
    });
    res.json(reviews);
  } catch (err) {
    console.log("there was an error in GET /api/users/:id/reviews");
    next(err);
  }
});

// PUT /api/users/:id
router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      attributes: ["id", "email", "preferredName"],
    });
    if (req.body.preferredName) {
      await user.update({ preferredName: req.body.preferredName });
    }
    if (req.body.neighborhood) {
      await user.update({ neighborhoodPreference: req.body.neighborhood });
    }
    if (req.body.maxPrice) {
      await user.update({ maxPricePreference: req.body.maxPrice });
    }
    res.json(user);
  } catch (err) {
    console.log("there was an error in PUT /api/users/:id");
    next(err);
  }
});
