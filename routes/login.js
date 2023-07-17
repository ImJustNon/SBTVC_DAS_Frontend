const express = require("express");
const { connection } = require("../database/connect.js");
const router = express.Router();


const bodyparser = require("body-parser");
const urlEncoded = bodyparser.urlencoded({
    extended: true,
    limit: "50mb",
});
const { check_login } = require("../utils/check_login.js");


router.get("/p/login", async(req, res) =>{
    const { is_login } = req.session ?? {};
    
    // ถ้า Login เเล้วให่ส่งไปหน้าหลัก
    if(is_login){
        return res.redirect("/p/home");
    }

    return res.render("index.ejs", {
        PAGE: "LOGIN",
        session: {
            is_login: is_login,
        }
    });
    
});

router.post("/api/login/auth", urlEncoded, async(req, res) =>{
    const { student_id } = req.body ?? {};

    if(!student_id){
        return res.json({
            status: "FAIL",
            error: "Cant find student_id from body",
        });
    }

    // เช็คเลขถูกต้อง
    connection.execute(`SELECT * from student_data_table WHERE student_id=?`, [student_id], async(error, results, fields) =>{
        if(error){
            return res.json({
                status: "FAIL",
                error: `Mysql error : ERROR : ${error}`
            });
        }

        if(results.length === 0){
            return res.json({
                status: "FAIL",
                error: "Cant find student data from this student id",
            });
        }

        req.session.is_login = true;
        req.session.student_id = student_id;

        return res.json({
            status: "SUCCESS",
            error: null,
            data: {
                is_login: await req.session.is_login,
                student_id: await req.session.student_id,
            }
        });
    });
});

module.exports = router;