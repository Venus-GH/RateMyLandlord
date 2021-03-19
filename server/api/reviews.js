const router = require("express").Router();
const { Landlord, Review, Building } = require("../db/models");
module.exports = router;

//POST /api/reviews
router.post("/", async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    res.status(201).send(await Review.create(req.body));
  } catch (error) {
    next(error);
    console.log("error adding review to database");
  }
});
