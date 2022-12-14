var express = require("express");
var router = express.Router();
var moment = require("moment"); // require
let now = moment();

require("../models/connection");

// importation du modele Trips pour pouvoir l'utiliser dans les routes
const Trip = require("../models/trips");
const Cart = require("../models/carts");
const fetch = require("node-fetch");

// GET home page.
router.post("/", function (req, res) {
  let fromHour = new Date("2022-09-23").setHours(00, 01, 00);
  let toHour = new Date("2022-09-23").setHours(23, 59, 59);
  // console.log(new Date(fromHour).toISOString());
  // console.log(new Date(toHour).toISOString());
  Trip.find({
    departure: { $regex: new RegExp(req.body.departure, "i") },
    arrival: { $regex: new RegExp(req.body.arrival, "i") },
    date: {
      $gte: fromHour,
      $lte: toHour,
    },
  }).then((trip) => {
    if (trip && trip.length) {
      res.json({ result: true, voyages: trip });
    } else {
      res.json({ result: false, error: "Trip not found" });
    }
  });
});

/* router.post("/", function (req, res) {
  let fromHour = new Date("2022-09-23").setHours(00, 01, 00);
  let toHour = new Date("2022-09-23").setHours(23, 59, 59);
  Trip.find({
    departure: { $regex: new RegExp(req.body.departure, "i") },
    arrival: { $regex: new RegExp(req.body.arrival, "i") },
    date: {
      $gte: fromHour,
      $lte: toHour,
    },
  }).then((trip) => {
    if (trip && trip.length) {
      res.json({ result: true, voyages: trip });
    } else {
      res.json({ result: false, error: "Trip not found" });
    }
  });
}); */

// DELETE elements in my cart
/* router.delete("/:trip", (req, res) => {
  Trip.deleteOne({
    departure: { $regex: new RegExp(req.body.departure, "i") },
    arrival: req.body.arrival,
  }).then((deletedDoc) => {
    if (deletedDoc.deletedCount > 0) {
      Trip.find().then((data) => {
        res.json({ result: true, trips: data });
      });
    } else {
      res.json({ result: false, error: "Trip not found" });
    }
  });
}); */

module.exports = router;
