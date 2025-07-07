const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) =>{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
}
