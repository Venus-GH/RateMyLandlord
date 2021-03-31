const router = require("express").Router();
const { Landlord, Review, Building, User } = require("../db/models");
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

    // find or create building – address, landlordId
    const building = await Building.findOrCreate({
      where: { address: address },
      defaults: { landlordId: landlord[0].id, latitude, longitude, borough },
    });

    const user = await User.findOne({
      where: { id: userId },
    });

    const review = await Review.create({
      grade,
      responsiveness,
      pestControl,
      kindness,
      maintenance,

      comments,
      wouldRecommend,
      tags,
      userId: user.id,
      landlordId: landlord[0].id,
      buildingId: building[0].id,
      allowContact,
    });

    const newReview = await Review.findOne({
      where: {
        id: review.id,
      },
      include: [Building, User],
    });

    res.json(newReview);
  } catch (error) {
    console.log("there was an error in POST /api/reviews/");
    next(error);
  }
});

// PUT /api/reviews/:id/thumbs
router.put("/:id/thumbs", async (req, res, next) => {
  try {
    // pass new number or just increment by 1??
    const review = await Review.findByPk(req.params.id);
    if (req.body.direction === "up")
      review.update({ thumbsUp: review.thumbsUp + 1 });
    else review.update({ thumbsDown: review.thumbsDown + 1 });
    res.json(review);
  } catch (error) {
    console.log("there was an error in PUT /api/reviews/:id");
    next(error);
  }
});
