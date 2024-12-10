

const mongoose = require("mongoose")
const express = require("express")
const Joi = require("joi")
const jwt = require("jsonwebtoken")


const staffSchema = new mongoose.Schema({

    email:{
        type: String,
        required: true,
        mixLength: 8,
        maxLength: 255
    },

    password:{
        type: String,
        required: true,
        unique: true,
        mixLength: 8,
        maxLength: 255
    }
})

userSchema.methods.createToken = function(){
    const accessToken = jwt.sign({_id: this._id}, "privatekey")
    return accessToken
}


const staffModel = mongoose.model("StaffDetail", staffSchema)

const validation = (staff) =>{
    const valStaffSchema = Joi.object({

        email: Joi.string().min(8).max(255).required(),
        password: Joi.string.min(8).max(255).required()
    })
    return valStaffSchema.validation(staff)
}

exports.validation = validation
exports.staffModel = staffModel