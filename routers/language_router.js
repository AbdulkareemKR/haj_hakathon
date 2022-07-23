const express = require("express");
const router = express.Router();
const hajDB = require("../models/haj_db");

// define the home page route
router.get("/", function (req, res) {
  let data = {
    languages: hajDB.getAllLanguages(),
  };
  res.render("patient.njk", data);
});

router.get("/receipt/:id", async function (req, res) {
  console.log("in the receipt router");
  patientId = req.params.id;
  let data = {
    receipt: await hajDB.getReceiptById(patientId),
  };
  console.log(data);
  a = JSON.stringify(data);
  res.send(a);
  // res.redirect("/");
});

// router.get("/", function (req, res) {
//   let data = {
//     languages: hajDB.getAllLanguages(),
//   };
//   res.render("base.njk", data);
// });

module.exports = router;
