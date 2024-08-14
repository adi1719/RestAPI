const express = require("express");
const { connectMongoDb } = require("./connection");

// const users = require("./MOCK_DATA.json");
const { logRequestResponse } = require("./middlewares/index");
const userRouter = require("./routes/user");

const app = express();
const port = 8000;

//Connection
connectMongoDb("mongodb://127.0.0.1:27017/myapp-1").then(() => {
  console.log("MongoDB Connected Successfully");
});

//MiddleWare
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(logRequestResponse("log.txt"));

// app.use((req, res, next) => {
//   console.log("Hello Form Middleware 1");
//   req.aditya = "raj";
//   next();
// // return res.json("Middleware");
// });

// app.use((req, res, next) => {
//   console.log("Hello Form Middleware 2");
// //   next();
// console.log(req.aditya);
// return res.json("Mid22");
// });

//Routes
app.use("/", userRouter);

app.listen(port, () => {
  console.log(`Server started at Port: ${port}`);
});
