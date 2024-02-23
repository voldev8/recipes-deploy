const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const connectDB = require("./db");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/error");
const helmet = require("helmet");
const cors = require("cors");

//load env variables
dotenv.config();

// Connect to Database
connectDB();

const recipesRouter = require("./routes/recipes");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.use("/api/recipes", recipesRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

app.use(errorHandler);
//catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`${process.env.NODE_ENV}, App listening on ${PORT}`);
});

module.exports = app;
