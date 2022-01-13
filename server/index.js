const express = require("express");
const app = express();
const mongoose = require("mongoose");

/// DATABASE CONNECTION
mongoose.connect(
  "mongodb://localhost:27017/tutorialmern?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
  { useNewUrlParser: true,useUnifiedTopology: true }
);


app.listen(8000, () => {
  console.log("You are connected 8000");
});
