const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
require("dotenv").config();
require("./Helpers/init_mongodb")

const AuthRouter = require("./Routes/Auth.route");

const app = express();
// Middleware for logging HTTP requests
app.use(morgan("dev"));

// Middleware for parsing JSON data
app.use(express.json());

// Middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Your routes here

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/auth", AuthRouter);


// Error handling middleware
app.use(async (req, res, next) => {
  next(createError.NotFound("This route does not exist"));
});

app.use((err, req, res, next) => {
  // Set the status code to the error code or 500 if not defined
  res.status(err.status || 500);

  // Send the error message as JSON
  res.json({
    status: err.status,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
