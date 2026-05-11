const express = require("express");
const {getUserInfo} = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


router.get("/me",getUserInfo);

module.exports = router;