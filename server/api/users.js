const router = require("express").Router();
const { User, Review, Building, Landlord } = require("../db/models");
module.exports = router;

// GET /api/users/
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
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
      include: [Building, Landlord],
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
    const user = await User.findByPk({
      attributes: ["id", "email", "preferredName"],
    });
    user.update({ preferredName: req.body.preferredName });
    res.json(user);
  } catch (err) {
    console.log("there was an error in PUT /api/users/:id");
    next(err);
  }
});
