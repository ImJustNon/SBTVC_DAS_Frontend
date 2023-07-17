const express = require("express");
const { connection } = require("../database/connect.js");
const router = express.Router();

const axios = require("axios");
const { check_login } = require("../utils/check_login.js");

router.get("/p/form", check_login, async(req, res) =>{

    return res.render("index.ejs", {
        PAGE: "FORM",
        session: {
            is_login: req.session.is_login
        }
    });
});

module.exports = router;