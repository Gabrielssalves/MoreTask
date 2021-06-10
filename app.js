const express = require("express");
const app = express();

const routeUser = require("./routes/user");
const routeWorkflow = require("./routes/workflow");
const routeTask = require("./routes/task");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app
  .use(express.static(__dirname + "/public"))
  .use(cookieParser());

app.use("/user", routeUser);
app.use("/workflow", routeWorkflow);
app.use("/task", routeTask);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
