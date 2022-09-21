var express = require("express");
var router = express.Router();
var moment = require("moment"); // require
let now = moment();

require("../models/connection");

// importation du modele Trips pour pouvoir l'utiliser dans les routes
const Trip = require("../models/trips");
const fetch = require("node-fetch");

// GET home page.
router.get("/", function (req, res) {
  // chercher dans la base de donnees si le trip existe et retourne un message d'erreur dans le cas contraire
  Trip.find({
    departure: { $regex: new RegExp(req.body.departure, "i") },
    arrival: { $regex: new RegExp(req.body.arrival, "i") },
    date: {
      $gte: new Date(req.body.date).setHours(00, 00, 1),
      $lt: new Date(req.body.date).setHours(23, 59, 59),
    },
  }).then((trip) => {
    if (trip && trip.length) {
      res.json({ result: true, voyages: trip });
    } else {
      res.json({ result: false, error: "Trip not found" });
    }
  });
});

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
