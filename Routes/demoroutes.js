const mongoose = require("mongoose")
const Joi = require("joi")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const {productValidation, pModel} = require("../Model/productModel")
const express = require("express")
const app = express()


app.use(express.json())




app.post("/api/sendata", async(req, res) => {
    //req.body = form data that we just submitted
    //from the form in the front end app
    const frontEndForm = req.body

    
    //Access database to get 
    // let update = await pModel.findOneAndUpdate({productNumber: formdata.productNumber}, {
    //     $set: {
    //         ...formdata
    //     }

    // })
   // if(!update) res.status(400).send("Updated Unsuccessful. Please Message IT Admin")
   if(!frontEndForm) return res.status(400).send("Invalid Form Input")
   console.log("Form recieved by front-end client", frontEndForm)
   res.status(200).send("Form Successfully Sent")
    
    //1. Save the data to the mongDB

    //2. Create a txt file in the node and store data


})

const port = process.env.PORT || 4000
app.listen(port, console.log(`Listening on port ${port}`))



