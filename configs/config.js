require("dotenv").config();

module.exports = {
    app: {
        port: process.env.PORT || 808,
        address: process.env.ADDRESS || "http://127.0.0.1",
        session: {
            secret: process.env.SESSION_SECRET,
            secure: process.env.SESSION_SECURE,
        }
    },
    database: {
        mysql: {
            host: process.env.MYSQL_HOST || "",                                     
            user: process.env.MYSQL_USER || "",     
            password: process.env.MYSQL_PASSWORD || "",                                     
            port: 3306,                                             
            database: process.env.MYSQL_DATABASE || "",            
        }
    },
    api: {
        secret_key: "nonlnwza"
    }
}