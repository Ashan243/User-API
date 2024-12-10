
const Joi = require("joi")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const MongooseSchema = new mongoose.Schema()


interface SchemaField {
    type: Number
    required: boolean
    unique: boolean
}

//Type Mapping 
type SchemaFields= {
    //K = property name
  
    //key: type name//property name
    //value: type name e.g  boolean
    [K in keyof SchemaField]: SchemaField[K]
}
//2.Inheritance Structure System - class SchemaModel extends schema //
class SchemaModel implements SchemaModel {

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


const joiValidationObj = Joi.object({
        id: Joi.number().required(),
        email: Joi.string().min(8).max(255).required(),
        password: Joi.string().min(8).max(1096).required()
})




exports.SchemaModel = new SchemaModel()
exports.joiValidationObj = joiValidationObj
