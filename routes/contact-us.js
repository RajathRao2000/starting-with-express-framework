const express = require("express");
const rootDir = require("../util/path");
const path = require("path");
const { getContacts, redirect } = require("../controllers/contactus");
const router = express.Router();
router.get("/", getContacts);

router.post("/", redirect);

module.exports = router;
