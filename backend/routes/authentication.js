const verifyToken = require("../middleware/verifyToken");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/authentication", verifyToken , (req,res)=>{
    res.json({ user: req.user});
});

module.exports = router;
