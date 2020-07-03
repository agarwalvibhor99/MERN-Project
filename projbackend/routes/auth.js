var express = require('express')
var router = express.Router()
const { check, validationResult } = require('express-validator');

const { signout, signup, signin, isSignedIn } = require("../controllers/auth")       //Importing file from controller

router.post("/signup", [
    check("name", " Name should be greater than 3 characters").isLength({min: 3}),   //Previous version
    check("email", " Incorrect email format").isEmail(),
    check("password", " Password should be greater than 3 characters").isLength({min: 3}),
], signup)

router.post("/signin", [
    check("email", " Email is required").isEmail(),
    check("password", " Password is required").isLength({min: 3}),
], signin)

router.get("/signout", signout)


router.get("/testroute", isSignedIn, (req, res) => {
    res.json(req.auth)
})
module.exports = router



//Update the validators later