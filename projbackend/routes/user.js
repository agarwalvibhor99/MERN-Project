const express = require("express")
const router = express.Router()

const { getUserByID, getUser, updateUser, userOrderList } = require("../controllers/user")
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")

router.param("userId", getUserByID)

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser)

router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser)

router.get("/orders/user/:userId", isSignedIn, isAuthenticated, userOrderList)

// router.get("/users", getAllUser) // TESTING : add in line 4 getAllUser if want to use
module.exports = router