const express = require("express");
const app = express();

const routeUser = require("./routes/user");
const routeWorkflow = require("./routes/workflow");
const routeTask = require("./routes/task");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app
  .use(express.static(__dirname + "/public"))
  .use(cors())
  .options('*', cors())
  .use(cookieParser());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Header",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );

//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).send({});
//   }

//   next();
// });

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
