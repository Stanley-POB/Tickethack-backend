var express = require("express");
var router = express.Router();
var moment = require("moment"); // require
let now = moment();

require("../models/connection");

// importation du modele Trips pour pouvoir l'utiliser dans les routes
const cart = require("./models/carts");
const fetch = require("node-fetch");

router.post("/mycart", function (req, res) {
  let fromHour = new Date("2022-09-23").setHours(00, 01, 00);
  let toHour = new Date("2022-09-23").setHours(23, 59, 59);
  // console.log(new Date(fromHour).toISOString());
  // console.log(new Date(toHour).toISOString());
  // chercher dans la base de donnees si le trip existe et retourne un message d'erreur dans le cas contraire
  // if (req.body.arrival === "")
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
