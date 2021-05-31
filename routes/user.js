const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const users = require("../models/user.model");
const db = require('../config/db1');
mongoose.connect(db.url);
let con= mongoose.connection;
con.on('error',()=>{
    console.log('connection error')
});

router.get('/get-user',(req, res)=>{
    users.find().then( (result)=>{
        res.json({
            result
        }).catch( (err)=>{
            console.log(err);
        });
    });
});


module.exports = router;