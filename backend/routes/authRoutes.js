const express = require("express");
const { signup, logout, userProfile } = require("../controllers/authController");
const { signin } = require("../controllers/authController");
const { isAuthenticated } = require("../middleware/auth")
var app = express();
const router= express.Router();

//auth routes
// signup api
router.post('/signup', signup);

// signIN api
router.post('/signin', signin);

    // Logoutapi
router.get('/logout', logout);

    // Profileapi
router.get('/me', isAuthenticated, userProfile);

module.exports = router;