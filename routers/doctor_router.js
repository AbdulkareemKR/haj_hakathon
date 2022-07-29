const express = require("express");
const router = express.Router();
const hajDB = require("../models/haj_db");

// define doctor home page
router.get("/", function (req, res) {
  let data = {
    page: "doctor",
  };
  res.render("doctor.njk", data);
});

router.post("/submit", function (req, res) {
  console.log(req.body);
  hajDB.addReceipt(req.body);
  res.redirect("/");
});

module.exports = router;
