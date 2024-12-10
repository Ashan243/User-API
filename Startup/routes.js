
const express = require("express")
const cors = require("cors")
const users = require("../Routes/userroutes")
const staff = require("../Routes/staffroutes")
const products = require("../Routes/productroutes")
const bodyparser = require("body-parser")
const {BASE_USER_ENDPOINT, BASE_PRODUCTS_ENDPOINT, BASE_STAFF_ENDPOINT} = require("../config/endpoints")
const app = express()


//CORS - Cross Origin Resource Sharing 
//Security Protocol to control the origins orf data being shared on server 
module.exports = function(app){
    app.use(cors())
    
    // app.use(bodyparser)
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())
    app.use(bodyparser.json())
    app.use(BASE_USER_ENDPOINT, users)
    //Base User Endpoint = "/api/users"
    app.use(BASE_STAFF_ENDPOINT ,staff)
    app.use(BASE_PRODUCTS_ENDPOINT, products)

}

