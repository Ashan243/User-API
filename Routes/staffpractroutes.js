
const config = require("config")
const express = require("express")
const router = express.Router()
const _ = require("lodash")
const bcrypt = require("bcrypt")
const {validation, staffModel} = require("../Model/staffpractmodel")
const Joi = require("joi")

router.put("/api/pract/staffsignup", async(req, res) =>{

    const {error} = validation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    let emailCheck = await staffModel.findOne({email: req.body.email})
    if (!emailCheck) return res.status(400).send("User Already exists")

    emailCheck: new staffModel({

        email: req.body.email,
        password: req.body.password
    })

    const salt = bcrypt.genSalt(10)
    emailCheck.password = bcrypt.hash(emailCheck.password, salt)

    emailCheck.save()
    const token = emailCheck.createToken()
    res.header("x-auth-staff").send("s")
})