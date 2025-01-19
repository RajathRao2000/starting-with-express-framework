const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const userController = require("../controllers/users");
router.get("/user-data", userController.getAppointments);

router.post("/user-data", userController.addAppointments);

router.delete("/user-data/:id", userController.deleteAppointments);

module.exports = router;
