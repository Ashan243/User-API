const config = require("config")
const {validation, usersModel} = require("../Model/sitemodel")
const express = require("express")
const mongoose = require("mongoose")
const Joi = require("joi")
const bcrypt = require("bcrypt")
const _ = require("lodash")
const jwt = require("jsonwebtoken")
const { Config } = require("git")
const dotenv = require("dotenv").config()
const router = express.Router()







router.post("/api/userlogin", async(req, res) =>{
    const {error} = validation(req.body)
    if (error) return res.status(400).send("User Already exists")
    //We inline if statement if the return data one line
//We can't use tenrary because we have multiple lines of code to execute if there is no retror

    let UsersEmail = usersModel.findOne({email: req.body.email})
    if (UsersEmail) return res.status(400).send("Sorry User Already Exists")

    const salt = await bcrypt.genSalt(15)
    UsersEmail.password = await bcrypt.hash(UsersEmail.password, salt)

    await UsersEmail.save()
    const token = UsersEmail.createToken()
    res.header("x-auth-users", token).send("Access Granted")

})