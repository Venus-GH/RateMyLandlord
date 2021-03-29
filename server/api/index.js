const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/landlords", require("./landlords"));
router.use("/buildings", require("./buildings"));
router.use("/reviews", require("./reviews"));
router.use("/featured", require("./featured"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
