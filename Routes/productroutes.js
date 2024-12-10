const mongoose = require("mongoose")
const Joi = require("joi")
const jwt = require("jsonwebtoken")
const express = require("express")
const {productValidation, pModel} = require("../Model/productModel")
const { remove } = require("lodash")
const cors = require("cors")
const fs = require("fs")
const app = express()
const router = express.Router()
const staffMiddleware = require("../Middleware/staffmiddleware")
const multer = require("multer")
const path = require("path")
const { exec } = require("child_process")
const { Extension } = require("typescript")
const { timeStamp } = require("console")


app.use("/uploads", express.static("uploads"))


router.get("/stock",staffMiddleware,  async(req, res) =>{
    //1. Connect to Mongo DB and return the stock amount field
    //2. Send this out
    // switch (req.params.preference) {
    //     case "n":
    //             req.params.preference = "name"
    //         break;
    //     case "N":
    //         req.params.preference = "nickname"
    //     default:
    //         break;
    // }
   const overallStock = await pModel.find().sort(req.params.preference)
   
    //Returns data objects
    res.send(overallStock)
})

router.get("/stock/:name", staffMiddleware, async(req, res) => {
    const name = req.params.name
    const item = await pModel.findOne({name: name})
    if(!item) return res.status(404).send(`\"${name}\" does not exist`)
    
})

router.post("/api/newproduct", async(req, res) =>{
    //Form of the data receive to endpoint req.body

    const userData = req.body
    if(!userData) return res.status(400).send("No data recieved")
    console.log(userData)
    const stringData = JSON.stringify(userData)
    res.send("Product Received")

    //Writing To A File 
    fs.writeFileSync("formData.txt", stringData, (err) => {
        if(err){
            console.log("We have error")
        }
        return;

        console.log("Data has been succcss extracted and writen")
    } )
    


})

//Posts
//1.Add a new Product
router.post("/addProduct", async(req, res) =>{
    const {error} = productValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)  

    // const newProd = new pModel({
    //     itemDescription: req.body.itemDescription
    // })
    console.log(req.body)
    const addProduct = new pModel({
        id: req.body.id,
        name: req.body.name,
        nickname: req.body.nickname,
        price: req.body.price,
        productNumber: req.body.productNumber,
        brand: req.body.brand,
        itemDescription: req.body.itemDescription,
        productImage: req.body.productImage,
        stock: req.body.stock,
        imageFileName: req.body.imageFileName
    }
        ) 
    const newProduct = await addProduct.save()
    res.send(newProduct)
  
})
//2. Remove a Product...How?

router.delete("/api/removeProduct/:productNumber", async(req, res) =>{
    
    const removeProd = await pModel.findOneAndDelete({productNumber: req.params.productNumber})
    if (!removeProd) return res.status(400).send("Product Number does not exist")

    res.send(`The product with product number ${removeProd.productNumber} has successfully been removed `)
})

let myArray = [1,2,3,4]
const newArray = myArray.map((item, index) => item*100)
//Upload Images

//Create our disk storage 
const multerStorage = multer.diskStorage({
    destination: function(req, file, cb){
       cb(null, "uploads/")
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
    //Date.now() + path.extname(file.originalname)
})

//Setup Multer Middleware 
const uploadProduct = multer({storage: multerStorage})

const getter = router.get("/", async(req, res) => {
    res.send("Hello")
})


router.post("/uploadproductimage", uploadProduct.single("image"), async(req, res) => {
    if(!req.file) return res.status(400).send("File Upload Found")
        const orignalFile = req.file.originalname

        //Query First Apporach
        //Query for the data - Search
        //Find that document for the search and update the all or some of the properities
        //find by unique --> update the data ---> save()
        const product1 = await pModel.findOne({name: req.params.name})
        if(!product1) return res.status(400).send("Product Name Not Found")
            // if(product1.imageFileName === "default.png" && product1.__v === 0)

        product1.imageFileName = req.file.originalname //Updated the schema document with name of the uploaded
        await product1.save()

      

        res.status(200).send("Your Image has been uploaded successful")
        //Update first 
        //We update and query at same time
       //update first ---> get access to updated documents if needs be {new: true}
        // await pModel.updateOne({name: req.params.name}, {
        //     $set:{
        //         imageFileName: orignalFile
        //     }

        // }, {new: true})

        // const fileName = req.file.originalname


        // const product = pModel.findOne({name: req.params.name})
        // if (!product) return res.status(400).send("Product Not Found")
        
        //     product.updateOne({imageFileName: req.body.imageFileName})
        // //MongoDB logo 
        // //1. Find product by name 
        // //2. update the imageFileName field with the file name of the uploaded image

    // console.log(typeof(req.file))

    
    //  const filePath = `/uploads/${req.file.filename}`
    //  res.status(200).send(filePath)

})

router.put("/updateimage/:id", async(req, res) =>{


    const productImage = pModel.findOne({id: req.params.id})
    if(!productImage) res.status(400).send("Product with Id does not exist")

    productImage.updateOne({id: req.params.id}, {
        $set: {
            imageFileName: req.body.imageName
        }
    })

    const findImage = pModel.findOneAndUpdate({imageFileName: req.body.currentImage, imageFileName: req.body.newImage})
    if (!findImage) return res.status(400).send("Error Updating Image")

    res.status(200).send(`Image Updated ${findImage}`)


})

// router.post("/uploadVideo", uploadProduct.single("video"), async(req, res) =>{
//     const video = req.file
//     if(!video) return res.status(400).send("Error")

//     // const split = video.filename.split(".")
//     // const videoType = split[1]
//     //Split the string by the . we get an array of two values
//     //video.mp4 = ["video", "mp4"]
     
//     //Another Methid
//     // const length = video.filename.length
//     const extensionSuffix = video.filename.substring(video.filename.length -3, video.filename.length)
//     console.log(extensionSuffix)
//     //[...first 20, 24]
//     //0, 19,20
//     //download.mp4 = .mp4 
//     // Getting playable format

// if(extensionSuffix !== ".mp4"){
//     const productVideoPath = video.path
//     const outputPath = ".mp4"

//     //use ffmpeg to get mp4 format for the end

//  try {
//      exec(`ffmpeg -i ${productVideoPath}${outputPath}`, 
//              (error, stdout, stderr) => {
//                  if(error) {
//                      console.error("Error converting uploaded video", error)
//                      return res.status(500).send("Error converting video, please try again later")
//                  }
                 
//              })
 
//          //Converting - Unlink the file 
//      fs.unlinkSync(productVideoPath)
    
//  } catch (error) {
//     res.status(500).send("Error: ", error)
//  }
// }
//     res.status(200).send("Successful Uploaded Video")


// })//Single Video

const viStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "multiple/")
    
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const viFilesFilter = (req, file, cb) => {
    if(file.mimetype.startWith("image/") || file.mimetype.startWith("video/")){
        //true - means accepts files
        cb(null, true)
    }
    else {
        cb(new Error("Cannot find supported file type. Must be an image or a video"), false)
    }
}

const viUpload = multer({storage: viStorage})
router.post("/uploadMulti", viUpload.array("files", 5), async(req, res) =>{

    if(!req.file) return res.status(400).send("No File Has Been Uploaded!")
        res.status(200).json({
        message: "File(s) have been uploaded successful",
        timestamp: Date.UTC(Date.now())
    })
})

router.post("/uploadSingle", viUpload.single("image"), async(req, res) =>{

    if (!req.file) return res.status(400).send("Cannot Find File")

        const imageString = req.file.originalname
    
        res.status(200).json({

        message: "File Has Been Uploaded",
        timestamp: Date.UTC(Date.now()),
        originalname: imageString
    })

    


})





router.post("/changeProductName/:id", viUpload.single("video") ,async(req, res) =>{

    if(!req.file) return res.status(400).send("No Files Uploaded")
    const {error} = productValidation(req.body)
    if (error) return res.status(404).send("Invalid Data Recieved")


  
    const changeImageName = await pModel.findOneAndUpdate({id: req.params.id}, {
        $set: {
            productImage: req.file.originalname
        }
    }, {new: true})
    if(!changeImageName) return console.log("Error")
   
    // changeImageName.productImage = req.file.originalname
    // changeImageName.save()

    res.status(200).json({

        message: `File ${changeImageName} Has Been Changed`,
        timestamp: Date.UTC(Date.now())
    })
    

    
})





router.put("/changeItemId/:id", async(req, res) =>{
    const {error} = productValidation(req.body)
    if (error) return res.status(400).send("Invalid Data")


const findItem = await pModel.findOneAndUpdate({id: (req.params.id || req.body.id)}, {
        
        $set: {
         id: req.body.id
        }
 })
    if(!findItem) return res.status(400).send("Item Could Not Be Found")

    res.send("Item Id Has Been Updated")
})

router.put("/api/updateProduct/:productNumber", async(req, res) =>{

    const {error} = productValidation(req.body)
    if(!error) return res.status(400).send(error.details[0].message) 
    ///Query First, then Update
    const product = await pModel.findOne({productNumber: req.params.productNumber})
    if (!product) return res.status(400).send("Sorry, product number does not exist!")

//or use product.set
 

    //Find and Update method
    

    const product2 = await pModel.findOneAndUpdate({productNumber: req.params.productNumber}, {
        $set: {
            ...data,
            price: 500,
            nickname: "thingy"
        },
        
    
    }, {new: true})
    

    const change = await product.save()
    res.send(change)
    


})  


router.post("/api/addtomdb", async(req, res) =>{
    const product = req.body
    if(!product)  return res.status(400).send("Product Does Not Exist")

    const newProduct = new pModel({

      
        name: product.name,
        nickname: product.nickname,
        price: product.price,
        productNumber: product.productNumber,
        brand: product.brand,
        itemDescription: product.itemDescription,
        productImage: product.productImage,
        stock: product.stock
    })

    await newProduct.save()
    res.status(200).send("New Form Data Added")
    console.log(newProduct)



})



router.post("/endpoint", async(req, res) =>{

    // const {error} = productValidation(req.body)
    // if(error) return res.status(400).send("Invalid Data")
    console.log(req.body)
    const newValue = await pModel.findOne({id: req.body.id})
    if (!newValue) return res.status(400).send("Incorrect Value")
        console.log(req.body)
    res.status(200).send(newValue)
   
})

module.exports = router