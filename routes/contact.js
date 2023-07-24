const express = require("express");
const { connection } = require("../database/connect.js");
const router = express.Router();

const axios = require("axios");
const { check_login } = require("../utils/check_login.js");

router.get("/p/contact", async(req, res) =>{

    const { is_login, student_id } = req.session ?? {};

    return res.render("index.ejs", {
        PAGE: "CONTACT",
        session: {
            is_login: is_login,
            student_id: typeof student_id === "undefined" ? null : req.session.student_id, 
        }
    });
    
});

module.exports = router;