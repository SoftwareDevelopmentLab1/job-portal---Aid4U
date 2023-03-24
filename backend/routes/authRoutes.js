const express = require("express");
const { signup, logout } = require("../controllers/authController");
const { signin } = require("../controllers/authController");
var app = express();
const router= express.Router();

//auth routes
// signup api
router.post('/signup', signup);

// signIN api
router.post('/signin', signin);

    module.exports = router;

    // Logoutapi
router.get('/logout', logout);

module.exports = router;