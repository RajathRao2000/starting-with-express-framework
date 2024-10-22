const express = require("express");
const rootDir = require("../util/path");
const path = require("path");
const router = express.Router();
router.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "contact-us.html"));
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  res.redirect("/success");
});

module.exports = router;
