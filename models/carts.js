const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  trip: { type: mongoose.Schema.Types.ObjectId, ref: "trips" },
  isPaid: Boolean,
});

const Cart = mongoose.model("carts", cartSchema);

module.exports = Cart;
