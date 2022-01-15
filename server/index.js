const express = require("express");
const app = express();
const cors= require("cors")
const mongoose = require("mongoose");
const FriendModel = require("./models/Friends");

app.use(cors())
//middleware, when we use to get data from front end we need middleware
app.use(express.json())

/// DATABASE CONNECTION
mongoose.connect(
  "mongodb://localhost:27017/tutorialmern?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
  { useNewUrlParser: true }
);


//req we get from front end, res is what we send
//how to insert data
app.post("/addfriend", async (req, res) => {
  const name= req.body.name;
  const age = req.body.age;
  const friend = new FriendModel({ name: name, age: age });
  await friend.save();
  res.send("Success");
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
