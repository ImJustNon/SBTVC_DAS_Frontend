// auto complete input element
const input_student_id = document.getElementById("input_student_id");
const input_student_prefix = document.getElementById("input_prefix");
const input_student_name = document.getElementById("input_name");
const input_student_lastname = document.getElementById("input_lastname");
const input_student_reg_type = document.getElementById("input_reg_type");

// have to type input element
const input_year_level = document.getElementById("input_year_level");
const input_student_dorm_number = document.getElementById("input_dorm_number");
const input_student_room_number = document.getElementById("input_room_number");
const input_student_phone_number = document.getElementById("input_phone_number");
const input_leave_date = document.getElementById("input_leave_date");
const input_leave_time = document.getElementById("input_leave_time");
const input_leave_for = document.getElementById("input_reason");
const input_come_date = document.getElementById("input_come_date");
const input_come_time = document.getElementById("input_come_time");
const input_leave_total = document.getElementById("input_total_leave");
const input_travel_by = document.getElementById("input_travel_by");
const input_parent_name = document.getElementById("input_parent_name");
const input_parent_lastname = document.getElementById("input_parent_lastname");
const input_parent_phone_number = document.getElementById("input_parent_phone_number");
// file upload input
const input_upload_image = document.getElementById("input_upload_image");


const status_allow = document.getElementById("status_allow");
const status_auth_leave = document.getElementById("status_auth_leave");
const status_auth_come = document.getElementById("status_auth_come");

// backin button
const form_backin_btn = document.getElementById("form_backin_btn");


// qr section
const qr_request_btn = document.getElementById("qr_request_btn");
const qr_title = document.getElementById("qr_title");
const qr_img = document.getElementById("qr_img");

// auto fill
axios.get(`https://sbtvc-das-api.nonlnwza.xyz/api/form/check_send_form_history?student_id=${student_id}`).then(response =>{
    if(response.data.status === "FAIL"){
        notyf.error(response.data.error);
        console.log(response.data.error);
        return;
    }

    input_student_id.value = response.data.data.results[0].student_id;
    input_student_prefix.value = response.data.data.results[0].student_prefix;
    input_student_name.value = response.data.data.results[0].student_name;
    input_student_lastname.value = response.data.data.results[0].student_lastname;
    input_student_reg_type.value = response.data.data.results[0].student_reg_type;

    input_year_level.value = response.data.data.results[0].student_year_level;
    input_student_dorm_number.value = response.data.data.results[0].student_dorm_number;
    input_student_room_number.value = response.data.data.results[0].student_room_number;
    input_student_phone_number.value = response.data.data.results[0].student_phone_number;
    input_leave_date.value = response.data.data.results[0].leave_date;
    input_leave_time.value = response.data.data.results[0].leave_time;
    input_leave_for.value = response.data.data.results[0].leave_for;
    input_come_date.value = response.data.data.results[0].come_date;
    input_come_time.value = response.data.data.results[0].come_time;
    input_leave_total.value = response.data.data.results[0].leave_total;
    input_travel_by.value = response.data.data.results[0].travel_by;
    input_parent_name.value = response.data.data.results[0].parent_name;
    input_parent_lastname.value = response.data.data.results[0].parent_lastname;
    input_parent_phone_number.value = response.data.data.results[0].parent_phone_number;
    input_upload_image.value = response.data.data.results[0].image_link;
    console.log()
    notyf.success("กรอกข้อมูลอัตโนมัติสำเร็จ");
    console.log("[FORM-PAGE-CURRENT] Insert value to input element successful");
}).catch(err =>{
    notyf.error(err);
    console.log(err);
    return;
});



// status panel
update_status_panel(); // run at first load

document.getElementById("form_status_btn").addEventListener("click", () =>{
    update_status_panel();
});
function update_status_panel(){
    axios.get(`https://sbtvc-das-api.nonlnwza.xyz/api/form/check_send_form_history?student_id=${student_id}`).then(response =>{
        if(response.data.status === "FAIL"){
            notyf.error(response.data.error);
            console.log(response.data.error);
            return;
        }
        status_allow.innerHTML = response.data.data.results[0].allow === "true" ? "✅" : "❌";
        status_auth_leave.innerHTML = response.data.data.results[0].out_location_auth === "true" ? "✅" : "❌";
        status_auth_come.innerHTML = response.data.data.results[0].in_location_auth === "true" ? "✅" : "❌";
        // backin button
        form_backin_btn.disabled = response.data.data.results[0].in____location_auth === "true" ? false : true;
        // update qr request title
        qr_title.innerHTML = response.data.data.results[0].out_location_auth === "true" ? "QRCODE (เข้า)" : "QRCODE (ออก)";
        // log
        notyf.success("อัปเดตสถานะสำเร็จ");
        console.log("[FORM-PAGE-CURRENT] Update status panel successful");
    }).catch(err =>{
        notyf.error(err);
        console.log(err);
        return;
    });
}


// qr code section
qr_request_btn.addEventListener("click", () =>{
    axios.get(`https://sbtvc-das-api.nonlnwza.xyz/api/form/check_send_form_history?student_id=${student_id}`).then(response =>{
        if(response.data.status === "FAIL"){
            notyf.error(response.data.error);
            console.log(response.data.error);
            return;
        }

        const location_auth_id = response.data.data.results[0].location_auth_id;
        const type = "home";
        const for_ = response.data.data.results[0].out_location_auth === "true" ? "in" : "out";

        axios.get(`https://sbtvc-das-api.nonlnwza.xyz/api/generator/qr_code_generator?location_auth_id=${location_auth_id}&type=${type}&for_=${for_}`).then(response =>{
            if(response.data.status === "FAIL"){
                notyf.error(response.data.error);
                console.log(response.data.error);
                return;
            }    
            // qr base64 to element
            qr_img.src = response.data.data.data;
            notyf.success("สร้าง QR-Code สำเร็จ");
            console.log("[FORM-PAGE-CURRENT] Generate Qr-code successful");
            return;
        }).catch(err =>{
            notyf.error(err);
            console.log(err);
            return;
        });
        
    }).catch(err =>{
        notyf.error(err);
        console.log(err);
        return;
    });
});


// // ============================================================= Old Code =============================================================================================================

// // request data from API and auto insert to input element
// (async function(){
// axios.get(`https://sbtvc-das-api.nonlnwza.xyz/api/users/${student_id}`).then(response =>{
//     if(response.data.status === "FAIL"){
//     notyf.error(response.data.error);
//     console.error("[FORM-PAGE] Can't find student data from this student_id :: ERROR :: " + response.data.error);
//     return;
//     }

//     input_student_id.value = response.data.data.results[0].student_id;
//     input_student_prefix.value = response.data.data.results[0].student_prefix;
//     input_student_name.value = response.data.data.results[0].student_name;
//     input_student_lastname.value = response.data.data.results[0].student_lastname;
//     input_student_reg_type.value = response.data.data.results[0].student_reg_type;

//     notyf.success("เติมข้อมูลอัตโนมัติ เรียบร้อย");
//     console.log("[FORM-PAGE] Fetch student data successful");
// }).catch(err => notyf.error(err));
// })();


// // ==========================================================================================================================================================================


// // check form script
// function check_sign_input(){
// if(input_student_id.value.length < 1){
//     notyf.error("โปรดระบุ : เลขประจำตัวนักเรียน"); 
//     return 0;
// }
// if(input_student_prefix.value.length < 1){
//     notyf.error("โปรดระบุ : คำนำหน้า"); 
//     return 0;
// }
// if(input_student_name.value.length < 1){
//     notyf.error("โปรดระบุ : ชื่อนักเรียน"); 
//     return 0;
// }
// if(input_student_lastname.value.length < 1){
//     notyf.error("โปรดะบ : ชื่อนามสกุล"); 
//     return 0;
// }
// if(input_student_reg_type.value.length < 1){
//     notyf.error("โปรดระบุ : สาขา"); 
//     return 0;
// }
// if(input_student_phone_number.value.length < 1){
//     notyf.error("โปรดระบุ : เบอร์โทรศัพท์(นักเรียน)"); 
//     return 0;
// }
// if(input_year_level.value.length < 1){
//     notyf.error("โปรดระบุ : ปีที่กำลังเรียน"); 
//     return 0;
// }
// if(input_student_dorm_number.value.length < 1){
//     notyf.error("โปรดระบุ : เลขที่หอ"); 
//     return 0;
// }
// if(input_student_room_number.value.length < 1){
//     notyf.error("โปรดระบุ : เลขที่ห้อง"); 
//     return 0;
// }
// if(input_leave_date.value.length < 1){
//     notyf.error("โปรดระบุ : วันที่ออก"); 
//     return 0;
// }
// if(input_leave_time.value.length < 1){
//     notyf.error("โปรดระบุ : เวลาที่ออก"); 
//     return 0;
// }
// if(input_leave_for.value.length < 1){
//     notyf.error("โปรดระบุ : เหตุผลในการขอออก"); 
//     return 0;
// }
// if(input_come_date.value.length < 1){
//     notyf.error("โปรดระบุ : วันเข้าหอ"); 
//     return 0;
// }
// if(input_come_time.value.length < 1){
//     notyf.error("โปรดระบุ : เวลาเข้าหอ"); 
//     return 0;
// }
// if(input_leave_total.value.length < 1){
//     notyf.error("โปรดระบุ : รวมเวลาที่ออก"); 
//     return 0;
// }
// if(input_travel_by.value.length < 1){
//     notyf.error("โปรดระบุ : เดินทางโดย"); 
//     return 0;
// }
// if(input_parent_name.value.length < 1){
//     notyf.error("โปรดระบุ : ชื่อผู้ปกครอง"); 
//     return 0;
// }
// if(input_parent_lastname.value.length < 1){
//     notyf.error("โปรดระบุ : ชื่อนามสกุลผู้ปกครอง"); 
//     return 0;
// }
// if(input_parent_phone_number.value.length < 1){
//     notyf.error("โปรดระบุ : เบอร์โทรศัพท์(ผู้ปกครอง)"); 
//     return 0;
// }
// if(input_upload_image.value.length < 1){
//     notyf.error("โปรดอัปโหลด : ภาพหลักฐาน"); 
//     return 0;
// }
// return 1;
// }

// // ==========================================================================================================================================================================


// // when click submit btn
// document.getElementById("form_submit_btn").addEventListener("click", async function(){
// const check_form_integrity = check_sign_input();
// if(check_form_integrity === 0){
//     return;
// }

// const response = await axios.post('https://sbtvc-das-api.nonlnwza.xyz/api/form/send_form', {
//     student_dorm_number: "1",
//     student_room_number: "202",
//     student_phone_number: "0936525578",
//     student_id : "65202910002",
//     leave_date : "07/08/2023",
//     leave_time : "11.53.43PM",
//     leave_for : "กลับบ้าน",
//     come_date : "07/11/2023",
//     come_time : "06.00.00PM",
//     leave_total : "2",
//     travel_by : "ผู้ปกครองมารับ",
//     parent_name : "สิทธิกร",
//     parent_lastname : "เเป้นสูง",
//     parent_phone_number : "0956235789",
//     image_link : "https://upload-api.nonlnwza.xyz/image?id=659565464654",
//     image_name : "lnwza.png",
// }, {
//     headers: {
//     'Content-Type': 'application/json'
//     }
// })
// console.log(response);
// });


// // ==========================================================================================================================================================================



// // status manager
// async function check_form_history(){
//     axios.get(`https://sbtvc-das-api.nonlnwza.xyz/api/form/check_send_form_history?student_id=${student_id}`).then(response =>{
//         if(response.data.status === "FAIL"){
//             return notyf.error(response.data.error);
//         }
//         if(response.data.data.have_data == true){
//             // disable hide submit button
//             document.getElementById("form_submit_btn").style.display = "none";
//             // fill data to input element
//             input_student_id.value = response.data.data.results[0].student_id;
//             input_student_prefix.value = response.data.data.results[0].student_prefix;
//             input_student_name.value = response.data.data.results[0].student_name;
//             input_student_lastname.value = response.data.data.results[0].student_lastname;
//             input_student_reg_type.value = response.data.data.results[0].student_reg_type;

//             input_year_level.value = response.data.data.results[0].student_year_level;
//             input_student_dorm_number.value = response.data.data.results[0].student_dorm_number;
//             input_student_room_number.value = response.data.data.results[0].student_room_number;
//             input_student_phone_number.value = response.data.data.results[0].student_phone_number;
//             input_leave_date.value = response.data.data.results[0].leave_date;
//             input_leave_time.value = response.data.data.results[0].leave_time;
//             input_leave_for.value = response.data.data.results[0].leave_for;
//             input_come_date.value = response.data.data.results[0].come_date;
//             input_come_time.value = response.data.data.results[0].come_time;
//             input_leave_total.value = response.data.data.results[0].leave_total;
//             input_travel_by.value = response.data.data.results[0].travel_by;
//             input_parent_name.value = response.data.data.results[0].parent_name;
//             input_parent_lastname.value = response.data.data.results[0].parent_lastname;
//             input_parent_phone_number.value = response.data.data.results[0].parent_phone_number;
//             // fill data to left panel
//             status_allow.innerHTML = response.data.data.results[0].allow === "true" ? "✅" : "❌";
//             status_auth_leave.innerHTML = response.data.data.results[0].out_location_auth === "true" ? "✅" : "❌";
//             status_auth_come.innerHTML = response.data.data.results[0].in_location_auth === "true" ? "✅" : "❌";
//             status_image.innerHTML = response.data.data.results[0].image_link;
//             // Log
//             notyf.success("พบฟอร์มล่าสุด");
//             console.log("[FORM-PAGE] last form found");
//             return;
//         }
//         if(response.data.data.have_data == false){
//             // fill data to left panel
//             status_allow.innerHTML = "❌";
//             status_auth_leave.innerHTML = "❌";
//             status_auth_come.innerHTML = "❌";
//             status_image.innerHTML = "❌";
//         }   
//     });
// }
// check_form_history();