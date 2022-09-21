var express = require("express");
var router = express.Router();

require("../models/connection");

// importation du modele Trips pour pouvoir l'utiliser dans les routes
const fetch = require("node-fetch");
const Cart = require("./models/carts");
const Trip = require("../models/trips");

// cherche tous les trips dans la collection carts
router.get("/", (req, res) => {
  Cart.find().then((data) => {
    res.json({ voyages: data });
  });
});

router.post("/mycart", (req, res) => {
  // Check if trip has already been added
  Cart.find().then((data) => {
    if (data) {
      res.json({ result: true, weather: data });
    } else {
      res.json({ result: false, error: "City not found" });
    }
  });

  Cart.findbyID({ id: req.body.id }).then((dbData) => {
    if (dbData) {
      // Creates new document with trips data based on foreign key
      const newCart = new Cart({
        trip: req.body.trip,
        isPaid: req.body.isPaid,
      });

      // Finally save in database
      newCart.save().then((newDoc) => {
        res.json({ result: true, cart: newDoc });
      });
    } else {
      // Trip already exists in database
      res.json({ result: false, error: "City already saved" });
    }
  });
});
