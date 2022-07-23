const express = require("express");
const router = express.Router();
const hajDB = require("../models/haj_db");

router.get("/:id", function (req, res) {
  let data = {
    languages: hajDB.getAllLanguages(),
  };
  res.render("patient.njk", data);
});

module.exports = router;
