const express = require("express");
const router = express.Router();

const servicesController = require("../controllers/medical-services");
const validation = require("../middleware/validate");


router.get("/", servicesController.getAll);

router.get("/:id", servicesController.getSingle);

router.post("/", validation.saveService, servicesController.createServices);

router.put("/:id", validation.saveService, servicesController.updateServices);

router.delete("/:id", servicesController.deleteServices);

module.exports = router;