const Category = require("../models/category")

exports.getCategoryById = (req, res, next, id) => {

    Category.findById(id).exec((err, category) => {
        if(err){
            return res.status(400).json({
                error: "Category not found in database"
            })
        }
        req.category = category;
        next()
    })
}



exports.createCategory = (req, res) => {
    const category = new Category(req.body)
    category.save((err, category) => {
        if(err){
            return res.status(400).json({
                error: "Not able to add category in Database"
            })
        }
        res.json({ category })
    })
}

exports.getCategory = (req, res) => {
    return res.json(req.category)
}


exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if(err){
            return res.status(400).json({
                error: "There are no category in Database"
            })
        }
        res.json(categories)
    })
}

exports.updateCategory = (req, res) => { 
    const category = req.category   //come from param
    category.name = req.body.name   //Come from user
    category.save((err, updatedCategory) => {
        if(err){
            return res.status(400).json({
                error: "Failed updating Category"
            })
        }
        res.json(updatedCategory)
    } )

}

exports.removeCategory = (req, res) => {
    const category = req.category       //From the middleware, extracting from paramteer
    category.remove((err, removedCategory) => {
        if(err){
            return res.status(400).json({
                error: `Error removing ${category}`
            })
        }
        res.json({
            message: `Successfuly Removed ${removedCategory} category`
        })
    })
} 