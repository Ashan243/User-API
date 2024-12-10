const mongoose = require("mongoose")
const _ = require("lodash")
const bcrypt = require("bcrypt")
const express = require("express")
const jwt = require("jsonwebtoken")


//Middle Function
module.exports = function userAuth(req, res, next){

    const userToken = req.header("x-auth-userToken")
    if (!userToken) return res.status(403).send("Access Denied")

    try {
        //This code we want to attempt run
        const token = jwt.verify(userToken, PRIVATE_KEY)
        req.user = token

        next()
        
    } catch (error) {
        //Error the try block doesn't work
        //error = node.js error 
        res.status(400).send("Invalid jwt Token")
        console.log(error)
    }
}