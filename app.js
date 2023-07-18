const express = require("express");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();

require("dotenv").config();
const config = require("./configs/config.js");

const http = require("http");
const createError = require('http-errors');
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bodyparser = require("body-parser");
const useragent = require("express-useragent");
const morgan = require("morgan");


// setup mongo
const mongoDBStore = new MongoDBStore({
    uri: 'mongodb+srv://Kwan-0111:LIVPbGPbI6fVLM9E@cluster0.rp8ie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    collection: 'sessions',
});
  
mongoDBStore.on('error', (error) => {
    console.log('MongoDB session store error:', error);
});
app.use(session({
    secret: config.app.session.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true, // Set to true if using HTTPS
        sameSite: 'none', // Allow cross-site cookies
        maxAge: 86400000, 
    },
    store: mongoDBStore,
}));


const server = http.createServer(app);
const urlEncoded = bodyparser.urlencoded({
    limit: "50mb",
    extended: true,
});
const jsonEncoded = express.json({
    limit: '50mb',
});
const logger = morgan("dev");
const static_public = express.static(path.join(__dirname,'./public'))
const static_libs = express.static(path.join(__dirname,'./node_modules'))

// app.set('trust proxy', 1); // Trust the first proxy (Vercel proxy)
app.use(cors());

// app.use(session({
//     secret: config.app.session.secret,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       secure: config.app.session.secure === "true" ? true : false, // Set to true if using HTTPS
//       // sameSite: 'none', // Allow cross-site cookies
//       maxAge: 86400000, // Time in milliseconds, e.g., 1 week
//     }
// }));
app.use(useragent.express());
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(logger);
app.use(static_public);
app.use(static_libs);
app.use(jsonEncoded);
app.use(urlEncoded);

// routes loader
fs.readdirSync("./routes").forEach(async files => {
    try {
        let router = require(`./routes/${files}`);
        app.use(router);
        console.log(('[ROUTES] ') + (`Loaded : `) + (files));
    }
    catch (e){
        console.log(('[ROUTES] ') + (`Fail to Load : `) + (files + " ERROR: " + e));
    }
});

server.listen(config.app.port);
server.on("listening", async() =>{
    console.log(("[APP] ") + (`Localhost : ${config.app.address}:${config.app.port}`));
    console.log(("[APP] ") + (`Listening on port : `) + (config.app.port));
});
server.on("error", (err) =>{
    console.log("[APP-ERROR] " + err);
});

require("./database/connect.js").connect()