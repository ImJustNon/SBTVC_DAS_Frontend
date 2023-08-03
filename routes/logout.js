const express = require("express");
const { connection } = require("../database/connect.js");
const router = express.Router();


const bodyparser = require("body-parser");
const urlEncoded = bodyparser.urlencoded({
    extended: true,
    limit: "50mb",
});
const { check_login } = require("../middleware/check_login.js");


router.post("/api/login/remove_login", urlEncoded, async(req, res) =>{
    const { is_login } = req.session ?? {};

    if(!is_login){
        return res.json({
            status: "FAIL",
            error: "no login",
        });
    }

    req.session.destroy(err => {
        if(err) {
            return res.json({
                status: "FAIL",
                error: `ERROR : ${err}`,
            });
        } 
        return res.json({
            status: "SUCCESS",
            error: null,
        });
    });
});

module.exports = router;