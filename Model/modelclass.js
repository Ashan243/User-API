
const Joi = require("joi")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")


const MongooseSchema = new mongoose.Schema

//2.Inheritance Structure System - class SchemaModel extends schema //
class SchemaModel {

   id = {
    type: Number,
    required:true,
    unique: true,

   }
   email = {
    type: String,
    required: true,
    unique: true,
    minLength: 8,
    maxLength: 255
   }
   password = {
    type: String,
    required: true,
    unique: true,
    minLength: 8,
    maxLength: 1096
    

   }

   


//    constructor(id, email, password) {
//     this.id = id,
//     this.email = email,
//     this.password = password
//    }

   generateToken() {
    return function(){
        const accessToken = jwt.sign({_id: this._id}, "privatekey")
        return accessToken
    }
   }
   getUserInfo(){}
}

const prop = new SchemaModel()

//Square Bracket Notation
prop.isAdmin = {
    type: Boolean
}
//Square Bracket Notation
prop["StaffRole"] = {
    type: String,
    minLength: 3,
    maxLength: 12
}








exports.SchemaModel = new SchemaModel()

