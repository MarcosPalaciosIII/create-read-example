require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

mongoose
    .connect("mongodb://localhost/create-read-example", {
        useNewUrlParser: true
    })
    .then(x => {
        console.log(
            `Connected to Mongo! Database name: "${x.connections[0].name}"`
        );
    })
    .catch(err => {
        console.error("Error connecting to mongo", err);
    });

const app_name = require("./package.json").name;
const debug = require("debug")(
    `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

// app.use(
//   require("node-sass-middleware")({
//     src: path.join(__dirname, "public"),
//     dest: path.join(__dirname, "public"),
//     sourceMap: true
//   })
// );

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// default value for title local
// app.locals is used to create a global variable in your app.js that can be used in your app.
// in order to call the below example you would just have to add {{title}} to any hbs file that you want to display the title in.
app.locals.title = "Express - Generated with IronGenerator";

// always remember to add your app.use for any route file that you create in order to have your routes linked to your app.

const index = require("./routes/index");
app.use("/", index);

// you don't necessarily have to have a variable created with the required field of the route to then pass it in to the app.use, you can just one line it like the example below.
app.use("/", require("./routes/create-read/form-page"));

// the "/" as the first field of app.use() is what the endpoint for that route file will be, ie: "/tasks" would mean that every route in your task routes file will now have to start with /task before any route that you set up for it.  localhost:3000/tasks/task-list, localhost:3000/tasks/task-details

module.exports = app;
