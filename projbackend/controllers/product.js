const Product = require("../models/product")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs") //filesystem

exports.getProductById = (req, res, next, id) => {
    Product.findById(id).populate("category").exec((err, product) => {               //Can have a sort or populate here
        if(err){
            res.status(400).json({
                error: "Product not found"
            })
        }
        req.product = product
        next()
    })
}

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, file) => {
        if(err){
           return res.status(400).json({
               error: "Error with Image"
           })
        }
        //Destructure the fields
        const { name, description, price, category , stock } = fields
        
        if(!name || !description || !price || !category || !stock){             //EXPRESS VALIDATION
            return res.status(400).json({
                error: "Please include all the required fields"
            })
        }

        //Todo: restrictions on field
        let product = new Product(fields)

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "File size greater than 3MB"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        
        //Save to database
        product.save((err, product) => {
            if(err){
                res.status(400).json({
                    error: "Updating the product to DB failed "
                })
            }
            res.json(product)
        })
    })
}