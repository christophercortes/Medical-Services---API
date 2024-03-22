const passport = require("passport");

const router = require("express").Router();

router.use("/", require("./swagger"));

// router.get("/", (req, res) => {
//   res.send("Hello World!");
// });

router.use("/community_health_centers", require("./medical-services"));

router.use("/medical_services", require("./hospital"));

router.get("/login", passport.authenticate("github"), (req, res) => {

});

router.get("/lougout", function (req, res, next) {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/")
  });
});

module.exports = router;
