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
                    error: "Createing the product in DB failed "
                })
            }
            res.json(product)
        })
    })
}

exports.getProduct = (res, req) => {
    req.product.photo = undefined
    return res.json(req.product)
}

//middleware
exports.photo = (req, res, next) => {        //to load in backgorund using middleware
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

exports.removeProduct = (req, res) => {
    let product = req.product
    product.remove ((err, removedProduct) => {
        if(err){
            return res.status(400).json({
                error: `Failed to delete ${product.name} product`
            })
        }
        res.json({
            message: `Removed ${removedProduct} successfully`,
            removedProduct
        })

    })

}

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, file) => {
        if(err){
           return res.status(400).json({
               error: "Error with Image"
           })
        }
    
        //Updation Code
        let product = req.product
        product = _.extend(product, fields)

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

//product listing
exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 5
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"

    Product.find().select("-photo").populate("category").sort([["sortBy", "asc"]]).limit(limit).exec((err, products) => {
        if(err){
            return res.status(400).json({
                error: "No Available Product"
            })
        }
        res.json(products)
    })
}

exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if(err){
            return res.status(400).json({
                error: "No Category Found"
            })
        }
        res.json(category)
    })
}


//Middleware

exports.updateStock = (req, res, next) => {

    let myOperations = req.body.order.products.map(product => {
        return {
            updateOne: {
                filter: {_id: product._id},
                update: {$inc: {stock:-product.count, sold: +product.count}}
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if(err){
            return res.status(400).json({
                error: "Bulk Operation Failed"
            })
        }
        next()
    })
}