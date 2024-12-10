const mongoose = require("mongoose")
const Joi = require("joi")
const jwt = require("jsonwebtoken")
const express = require("express")
const config = require("config")
const { json } = require("stream/consumers")
const {validate, userModel} = require("../Model/usermodel")
const { access } = require("fs")
const router = express.Router()
const staff = require("../Middleware/staffmiddleware")
const {BASE_STAFF_ENDPOINT} = require("../config/endpoints")
const {staffModel, validateStaff} = require("../Model/staffmodel")
const _ = require("lodash")
const {model, validation} = require("../Routes/staff")
const app = express()
app.use(express.json())

// mongoose.connect("mongodb://localhost:27017")
// .then(console.log("Connection Active"))
// .catch(err => console.log(err))

//http://localhost:3000/
app.post("/signup", async(req, res) =>{
    const {error} = validateStaff(req.body)
      //Form Setup - 6 or 7 fields
    if (error) return res.status(400).send("User Already Exists")

    const staffLogin = staffModel.findOne({email: req.body.email})
    if (staffLogin) res.status(400).send("Email Does Not Exist")

  

    const accessToken = staffLogin.generateToken()
    res.header("x-auth-stafflogin", accessToken).send("Welcome")
    //Code Here to set a personal profit based on pug (Dynamic HTML)
    //Lodash to pick obkject that name or req.body.name, email, use the data to generate a custom Dynamic HTML

    //h1 = message//
    //message = `Welcome to our website, ${req.body.name}`
    //h2 = name
    //name = req.body.name
    res.redirect()
    
})

router.get("/signin", staff, async(req, res) => {

  //Check the header of the request of the user
  const staffToken = req.header("x-auth-stafflogin")
  if(!staffToken) res.status(401).send("Access Denied")
  res.redirect("http://google.com")



})

router.get("/referal/:person", async(req,res) =>{
  const BASE_URL = "www.referal.staff/"
  //take the name of the referee
  //checking as to how many referal links the staff memeber is allowed to give
  //concentation of base url and the staff id or other metrics
 const refereeName = req.body.refereeName
 const noOfLinksAvailable = await model.find().sort("-name")
 if(noOfLinksAvailable !== 0) return BASE_URL.concat(refereeName, "12334")

 const update = model.findOneAndUpdate({numberOfLinks}, {
  $inc: {
    numberOfLinks: -1
  }
 })


  //Auto-generation of a URL from third-party
  //In-house url

  //Model 1 - Redirect the staff memeber to a dynamic HTML page where they can copy a referral URL code and share it 
  //Third Party influence

  //Model 2 - return as res.send to staff with a referral URL - native code 

  res.redirect()

})


// const port = process.env.PORT || 4000
// app.listen(port, () => console.log(`${port}`))

module.exports = router


