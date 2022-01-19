const express = require("express");
const app = express();
const cors= require("cors")
const mongoose = require("mongoose");
const FriendModel = require("./models/Friends");
require("dotenv").config();

app.use(cors())
//middleware, when we use to get data from front end we need middleware
app.use(express.json())

/// DATABASE CONNECTION
mongoose.connect(
  "mongodb+srv://deepakagarwal:password1234@mern.ccrii.mongodb.net/tutorialmern",
  { useNewUrlParser: true }
);


//req we get from front end, res is what we send
//how to insert data
app.post("/addfriend", async (req, res) => {
  const name= req.body.name;
  const age = req.body.age;
  const friend = new FriendModel({ name: name, age: age });
  await friend.save();
  res.send(friend);
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


app.put("/update", async(req,res)=>{
  const newAge= req.body.newAge
  const id= req.body.id
  try{
    await FriendModel.findById(id, (error,friendToUpdate)=>{
      friendToUpdate.age =Number(newAge)
      friendToUpdate.save()
    })
  } catch (err){
    console.log(err)
  }
  res.send("updated");
})

app.delete("/delete/:id", async(req,res)=>{
  const id= req.params.id;
  await FriendModel.findByIdAndRemove(id).exec();
  res.send("itemdeleted");
})

app.listen(process.env.PORT || 8000, () => {
  console.log("You are connected 8000");
});


// app.listen(8000, () => {
//   console.log("You are connected 8000");
// });
