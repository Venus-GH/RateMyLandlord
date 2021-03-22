const router = require("express").Router();
const { Landlord, Review, Building } = require("../db/models");
module.exports = router;

// POST /api/reviews/
router.post("/", async (req, res, next) => {
  try {
    const {
      landlordName,
      address,
      borough,
      latitude,
      longitude,
      grade,
      responsiveness,
      pestControl,
      kindness,
      maintenance,
      bedrooms,
      rent,
      leaseLength,
      startDate,
      comments,
      wouldRecommend,
      tags,
      userId,
      allowContact,
    } = req.body;
    // find or create landlord - name
    const landlord = await Landlord.findOrCreate({
      where: { name: landlordName },
    });
    console.log("landlord ------>", landlord);

    // find or create building – address, landlordId
    const building = await Building.findOrCreate({
      where: { address: address },
      defaults: { landlordId: landlord.id, latitude, longitude, borough },
    });
    console.log("building ------>", building);
    // create review -
    // (landlordName), grade, responsiveness, pestControl,
    // kindness, maintenance, bedrooms, rent, leaseLength, startDate,
    // comments, wouldRecommend, tags, userId, landlordId, buildingId

    const review = await Review.create({
      grade,
      responsiveness,
      pestControl,
      kindness,
      maintenance,
      bedrooms,
      rent,
      leaseLength,
      startDate,
      comments,
      wouldRecommend,
      tags,
      userId,
      landlordId: landlord.id,
      buildingId: building.id,
      allowContact,
    });
    console.log("review ------>", review);

    res.json(review);
  } catch (error) {
    next(error);
  }
});
