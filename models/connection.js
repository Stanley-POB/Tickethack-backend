const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://admin:TZmPxBwf0gt6tblV@cluster0.pkcqpp3.mongodb.net/tickethack";

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));
