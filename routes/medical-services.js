const express = require("express");
const router = express.Router();

const servicesController = require("../controllers/medical-services");

router.get("/", servicesController.getAll);

router.get("/:id", servicesController.getSingle);

router.post("/", servicesController.createServices);

module.exports = router;