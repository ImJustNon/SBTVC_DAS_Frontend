const express = require("express");
const { connection } = require("../database/connect.js");
const router = express.Router();

const axios = require("axios");

router.get("/p/home", async(req, res) =>{
    const { is_login } = req.session ?? {};

    return res.render("index.ejs", {
        PAGE: "HOME",
        session: {
            is_login: is_login,
        }
    });
});

module.exports = router;