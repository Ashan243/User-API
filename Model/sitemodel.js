const express = require("express")
const mongoose = require("mongoose")
const Joi = require("joi")
const jwt = require("jsonwebtoken")


const usersSchema = new mongoose.Schema({

    id:{
        type: Number,
        required: true,
        unique: true
    },

    email:{
        type: String,
        minLength: 8,
        maxLength: 255,
        required: true,
        unique: true
    },

    password:{
        type: String,
        minLength: 6,
        maxLength: 29,
        required: true
    }
})

const usersModel = mongoose.model("practsite", usersSchema)


usersSchema.methods.createToken = function(){
    const accessToken = jwt.sign({_id: this._id}, "privatekey")
    return accessToken
}

const validate = (users) =>{
    const validateSchema = Joi.object({

        id: Joi.number().required(),
        email: Joi.string().minLength(8).maxLength(255).required(),
        password: Joi.string().minLength(6).maxLength(29).required()
    })

    return validateSchema.validate(users)
}

    exports.validation = validate
    exports.usersModel = usersModel