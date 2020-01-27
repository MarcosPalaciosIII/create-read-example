const express = require("express");
const router = express.Router();
const Task = require("../../models/Task");

// GET Form Page
router.get("/form", (req, res, next) => {
    res.render("form-views/form");
});

// Post Form Input
// the endpoint that you create here is what you put in the action field of a form that you want to call this route and retrieve the values of the inputs.
router.post("/form-input", (req, res, next) => {
    // req.body is used to grab the value of an input which would normally be a post request.
    // in order to have a value in req.body, you must have a name field for each input that you wish to get the value from.
    console.log("the form info: ", req.body);

    Task.create(req.body)
        .then(taskFromDB => {
            console.log("the newly created task: ", { taskFromDB });

            res.redirect(`/task-details/${taskFromDB._id}`);
        })
        .catch(err => next(err));
});

// View Task List
router.get("/task-list", (req, res, next) => {
    Task.find()
        .then(tasksFromDB => {
            const data = {
                pageTitle: "Task List",
                tasks: tasksFromDB
            };

            res.render("task-views/task-list", data);
        })
        .catch(err => next(err));
});

// View Details of task
router.get("/task-details/:taskId", (req, res, next) => {
    // req.params is a variable that you set for your end point (:taskId).
    // you would have to put a : in-front of the variable that you are creating
    // and the value of that variable will be whatever is passed in the url endpoint when calling the route.

    // the req.param.taskId is used here to search the database for the specific task that we are using for by passing the tasks unique _id that we get when it is created on the database.
    Task.findById(req.params.taskId)
        .then(taskFromDB => {
            const data = {
                pageTitle: taskFromDB.title + " Details",
                task: taskFromDB
            };

            res.render("task-views/task-details", data);
        })
        .catch(err => next(err));
});

module.exports = router;
