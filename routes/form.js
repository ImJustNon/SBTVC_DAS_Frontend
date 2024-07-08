const express = require("express");
const { connection } = require("../database/connect.js");
const router = express.Router();

const axios = require("axios");
const { check_login } = require("../middleware/check_login.js");

router.get("/p/form", check_login, async(req, res) =>{

    try {
        const check_form_history = await axios.get(`http://1270.1:808/api/form/check_send_form_history?student_id=${req.session.student_id}`).catch(err => console.log(err));


        if(check_form_history.data.data.have_data){ // หน้าเเบบฟอร์มที่ส่งไปเเล้ว
            return res.render("index.ejs", {
                PAGE: "FORM",
                session: {
                    is_login: req.session.is_login,
                    student_id: req.session.student_id,    
                },
                server: {
                    have_data: check_form_history.data.data.have_data,
                    form_data: check_form_history.data.data.results[0],
                }
            });
        }
        else { //หน้าสร้างฟอร์มใหม่
            return res.render("index.ejs", {
                PAGE: "FORM",
                session: {
                    is_login: req.session.is_login,
                    student_id: req.session.student_id,
                },
                server: {
                    have_data: check_form_history.data.data.have_data,
                }
            });
        }
    }
    catch(e){
        return res.json({
            message: "Internal Server Error",
            error: e
        });
    }
    
    
});

module.exports = router;