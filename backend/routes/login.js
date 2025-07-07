const express = require("express");
const router = express.Router();
const db = require("./database");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/login", (req,res) =>{
    const { username, password } = req.body;
    db.query("Select * from users where username = ? and password = ?; ", [username,password], (err,results) =>{
        if (err){
            return res.json({ loggedIn: false, message: "SQL error" , error: err});
        }
        if(results.length > 0){
            const user = results[0];
            const token = jwt.sign(
                { id: user.username } , process.env.JWT_SECRET, {expiresIn: "1h"}
            );
            return res.json({ loggedIn: true,token, user:{username: user.username}}); 
        }else {
            return res.json({ loggedIn: false, message:"Invalid username or password"});
        }
    });
});

module.exports = router;
