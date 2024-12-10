
const config = require("config")
const express = require("express")
const _ = require("lodash")
const bcrypt = require("bcrypt")
const router = express.Router()
const {validate, practModel} = require("../Model/practModel")
const mongoose = require("mongoose")
const Joi = require("joi")


router.post("/api/pract/signup", async(req, res) =>{

    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await practModel.findOne({email: req.body.email})
    if (user) return res.status(400).send("User Already Exists")

    user = new practModel({
        email: req.body.email,
        password: req.body.password
    })

    const salt = bcrypt.genSalt(10)
    user.password = bcrypt.hash(user.password, salt)

    await user.save()
    const token = user.createToken()
    res.header("x-auth-user").send("Sign-up Successful")
})

router.post("/api/pract/signin", async(req, res) =>{

    const {error} = validate(req.body)
    if (error) return res.status(400).send("Invalid Data ")

    const user = await practModel.findOne({email: req.body.email})
    if (!user) return res.status(400).send("Email or Password Invalid")

    const password = bcrypt.compare(req.body.password, user.password)
    if (!password) return res.status(400).send("Email or Password Invalid")
})

router.put("/api/pract/updatemail", async(req, res) =>{

    const {error} = validate(req.body)
    if (error) return res.status(400).send("Invalid Data")

    const emailUpdate = await practModel.findOneAndUpdate({email: req.body.current}, {email: req.body.new})
    if (!emailUpdate) return res.status(400).send("Error Updating")

    res.status(200).send("Update Successful")
})

router.get("/api/pract/emailcheck", async(req, res) =>{

    const emailChecker = await practModel.findOne({email: req.body.email})
    res.send(emailChecker)

})

router.delete("/api/pract/deletemail", async(req, res) =>{

    const deletemail = await practModel.findOneAndDelete({email: req.body.email})
    if (!deletemail) return res.status(400).send("User Not Found")

    try {
        
        res.send("Email Deleted")

    } catch {
        
        res.status(400).send("Error Deleting Email")
    }
})