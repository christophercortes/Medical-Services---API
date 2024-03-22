const router = require("express").Router();

const getHospitalController = require("../controllers/hospital");

const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", getHospitalController.getAllHospital);

router.get("/:id", getHospitalController.getHospital);

router.post("/", isAuthenticated, getHospitalController.createHospital);

router.put("/:id", isAuthenticated, getHospitalController.updateHospital);

router.delete("/:id", isAuthenticated, getHospitalController.deleteHospital);

module.exports = router;