const express = require("express");
const { connection } = require("../database/connect.js");
const router = express.Router();

const axios = require("axios");

router.get("/", async(req, res) =>{
    return res.redirect("/p/home");
});

module.exports = router;