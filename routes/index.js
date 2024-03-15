const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/community_health_center", require("./medical-services"));

module.exports = router;
