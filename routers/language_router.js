const express = require("express");
const router = express.Router();
const hajDB = require("../models/haj_db");

// define the home page route
router.get("/", function (req, res) {
  let data = {
    languages: hajDB.getAllLanguages(),
  };
  res.render("temp.njk", data);
});

// router.get("/", function (req, res) {
//   let data = {
//     languages: hajDB.getAllLanguages(),
//   };
//   res.render("base.njk", data);
// });

module.exports = router;
