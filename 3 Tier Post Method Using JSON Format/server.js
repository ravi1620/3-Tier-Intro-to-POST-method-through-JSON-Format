//importing the libraries required to work with client as well as database. 
const mongoose = require("mongoose");
const cors =require("cors");
const express = require("express");
// create an app with express.
let app = express();
app.use(cors()); // Cross Origin Resource Sharing.
app.use(express.json()); // It converts the data from json format to jso format.


let userSchema = new mongoose.Schema({
  firstName:String,
  lastName:String,
  email:String,
  gender:String,
  maritalStatus:String,
  languages:String,
});

let User = new mongoose.model("employe",userSchema);

// creating an API(resource) point to connect with client.
app.post("/Signup",async (req,res)=>{
  console.log(req.body);

try {
  let user = new User({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    gender:req.body.email,
    marritalStatus:req.body.maritalStatus
    });
await User.insertMany([user]);
  res.json({status:"Success",msg:"User Created Succesfully"});
} catch (error) {
  res.json({status:"Failed",msg:"Unable to create user"});
}
})


// Creating port number for server.
app.listen(2345,()=>{
  console.log("Listening to port number 2345");
})





// connect Serevr to the Database.
let connectToDB = async ()=>{
try {
  await mongoose.connect("mongodb+srv://Ravi:Ravi@createdatabase.29g4i.mongodb.net/Selfdata?retryWrites=true&w=majority&appName=createDatabase")
console.log("Successfully connected to Database");
} catch (error) {
  console.log("Fetching error in connection to Database",error);
}};

connectToDB();


