const express = require("express");
const app = express();
const mongoose = require("mongoose");
const FriendModel = require("./models/Friends");

/// DATABASE CONNECTION
mongoose.connect(
  "mongodb://localhost:27017/tutorialmern?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
  { useNewUrlParser: true }
);


//req we get from front end, res is what we send
//how to insert data
app.get("/insert", async (req, res) => {
  const friend = new FriendModel({ name: "Jessic", age: 38 });
  await friend.save();
  res.send("Inserted DATA");
});

//how to receive data
app.get("/read", async(req,res)=>{
  FriendModel.find({},(err,result)=>{
    if(err){
      res.send(err)
    } else {
      res.send(result);
    }
  })
})

app.listen(8000, () => {
  console.log("You are connected 8000");
});
