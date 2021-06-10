const express = require("express");
const app = express();

const routeUser = require("./routes/user");
const routeWorkflow = require("./routes/workflow");
const routeTask = require("./routes/task");
const cookieParser = require("cookie-parser");
const cors = require("cors");

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
    methods: "PUT, POST, PATCH, DELETE, GET"
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app
  .use(express.static(__dirname + "/public"))
  .use(cors(corsOptions))
  .use(cookieParser());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");  
//   res.setHeader("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );

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
