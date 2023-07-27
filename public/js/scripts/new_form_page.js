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
const input_upload_link = document.getElementById("input_upload_link");
const input_upload_spinner = document.getElementById("input_upload_spinner");

// status panel element
const status_allow = document.getElementById("status_allow");
const status_auth_leave = document.getElementById("status_auth_leave");
const status_auth_come = document.getElementById("status_auth_come");
const status_send_form = document.getElementById("status_send_form");

// set default status panel
status_send_form.innerHTML = "❌";
status_allow.innerHTML = "❌";
status_auth_leave.innerHTML = "❌";
status_auth_come.innerHTML = "❌";



// auto fill
axios.get(`https://sbtvc-das-api.nonlnwza.xyz/api/users/${student_id}`).then(response =>{
    input_student_id.value = response.data.data.student_id;
    input_student_prefix.value = response.data.data.student_prefix;
    input_student_name.value = response.data.data.student_name;
    input_student_lastname.value = response.data.data.student_lastname;
    input_student_reg_type.value = response.data.data.student_reg_type;
    notyf.success("กรอกข้อมูลอัตโนมัติสำเร็จ");
    console.log("[FORM-PAGE(NEW)] Fill data complete");
}).catch(err => notyf.error(err));


// when submit form
document.getElementById("form_submit_btn").addEventListener("click", async() =>{
    // image upload here
        /////////////////////////////////////
    // image upload here
    if(check_sign_input() === 1){
        swal({
            title: "คุณเเน่ใจที่จะส่งหรือไม่",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async(submit) => {
            if (submit) {
                const response = await axios.post('https://sbtvc-das-api.nonlnwza.xyz/api/form/send_form', {
                    student_year_level: input_year_level.value,
                    student_dorm_number: input_student_dorm_number.value,
                    student_room_number: input_student_room_number.value,
                    student_phone_number: input_student_phone_number.value,
                    student_id : input_student_id.value,
                    leave_date : input_leave_date.value,
                    leave_time : input_leave_time.value,
                    leave_for : input_leave_for.value,
                    come_date : input_come_date.value,
                    come_time : input_come_time.value,
                    leave_total : input_leave_total.value,
                    travel_by : input_travel_by.value,
                    parent_name : input_parent_name.value,
                    parent_lastname : input_parent_lastname.value,
                    parent_phone_number : input_parent_phone_number.value,
                    image_link : input_upload_link.value,
                    image_name : input_upload_image.files[0].name,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
        
                if(response.data.status === "FAIL"){
                    notyf.error("ไม่สามารถส่งฟอร์มได้ โปรดลองใหม่ในภายหลัง");
                    console.log(`[FORM-PAGE(NEW)] API Error : ERROR : ${response.data.error}`);
                    return;
                }
                if(response.data.status === "SUCCESS"){
                    swal({
                        title: "ส่งเเบบฟอร์มเรียบร้อย",
                        text: "คลิ๊กเพื่อ Reload หน้านี้",
                        icon: "success",
                        buttons: "OK",
                    }).then(() => {
                        window.location.reload();
                        console.log("[FORM-PAGE-NEW] Send form successful")
                        return;
                    });
                }
            }
        });
    }
});





// image upload script
document.querySelector("#input_upload_image").addEventListener("change", readFile);
function readFile() {
    if (!this.files || !this.files[0]) return;
    const FR = new FileReader();
    FR.readAsDataURL(this.files[0]);
    FR.addEventListener("load", async function(evt) {
        // show spinner
        input_upload_spinner.classList.remove("d-none");
        // ส่ง Base64 กลับ
        // document.getElementById("uploadfile").value = evt.target.result;
        const image_base64 = evt.target.result;
        try {
            const response = await axios.post('https://upload-bypass.vercel.app/api/bypass/upload', {
                originalFileName: input_upload_image.files[0].name,
                file: image_base64,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if(response.data.status === "FAIL"){
                notyf.error(response.data.error);
                console.log(response.data.error);
                return;
            }

            // hidden spinner
            input_upload_spinner.classList.add("d-none");
            
            input_upload_link.value = response.data.data.link;
            notyf.success("อัปโหลดภาพสำเร็จ");
            console.log("[FORM-PAGE-NEW] Upload image succesful");
        }
        catch(err){
            console.log(err);
            notyf.error(err);    
        }
    }); 
}
















// script to check if have input not type
function check_sign_input(){
    if(input_student_id.value.length < 1){
        notyf.error("โปรดระบุ : เลขประจำตัวนักเรียน"); 
        return 0;
    }
    if(input_student_prefix.value.length < 1){
        notyf.error("โปรดระบุ : คำนำหน้า"); 
        return 0;
    }
    if(input_student_name.value.length < 1){
        notyf.error("โปรดระบุ : ชื่อนักเรียน"); 
        return 0;
    }
    if(input_student_lastname.value.length < 1){
        notyf.error("โปรดะบ : ชื่อนามสกุล"); 
        return 0;
    }
    if(input_student_reg_type.value.length < 1){
        notyf.error("โปรดระบุ : สาขา"); 
        return 0;
    }
    if(input_student_phone_number.value.length < 1){
        notyf.error("โปรดระบุ : เบอร์โทรศัพท์(นักเรียน)"); 
        return 0;
    }
    if(input_year_level.value.length < 1){
        notyf.error("โปรดระบุ : ปีที่กำลังเรียน"); 
        return 0;
    }
    if(input_student_dorm_number.value.length < 1){
        notyf.error("โปรดระบุ : เลขที่หอ"); 
        return 0;
    }
    if(input_student_room_number.value.length < 1){
        notyf.error("โปรดระบุ : เลขที่ห้อง"); 
        return 0;
    }
    if(input_leave_date.value.length < 1){
        notyf.error("โปรดระบุ : วันที่ออก"); 
        return 0;
    }
    if(input_leave_time.value.length < 1){
        notyf.error("โปรดระบุ : เวลาที่ออก"); 
        return 0;
    }
    if(input_leave_for.value.length < 1){
        notyf.error("โปรดระบุ : เหตุผลในการขอออก"); 
        return 0;
    }
    if(input_come_date.value.length < 1){
        notyf.error("โปรดระบุ : วันเข้าหอ"); 
        return 0;
    }
    if(input_come_time.value.length < 1){
        notyf.error("โปรดระบุ : เวลาเข้าหอ"); 
        return 0;
    }
    if(input_leave_total.value.length < 1){
        notyf.error("โปรดระบุ : รวมเวลาที่ออก"); 
        return 0;
    }
    if(input_travel_by.value.length < 1){
        notyf.error("โปรดระบุ : เดินทางโดย"); 
        return 0;
    }
    if(input_parent_name.value.length < 1){
        notyf.error("โปรดระบุ : ชื่อผู้ปกครอง"); 
        return 0;
    }
    if(input_parent_lastname.value.length < 1){
        notyf.error("โปรดระบุ : ชื่อนามสกุลผู้ปกครอง"); 
        return 0;
    }
    if(input_parent_phone_number.value.length < 1){
        notyf.error("โปรดระบุ : เบอร์โทรศัพท์(ผู้ปกครอง)"); 
        return 0;
    }
    if(input_upload_image.files.length == 0 ){
        notyf.error("โปรดอัปโหลด : ภาพหลักฐาน"); 
        return 0;
    }
    if(input_upload_link.value.length < 1){
        notyf.error("ไม่พบลิ้งภาพ : โปรดลองอัปโหลดภาพใหม่อีกครั้ง"); 
        return 0;
    }
    return 1;
}