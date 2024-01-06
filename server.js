// Enhances HTTP headers' security by setting various HTTP headers to protect against common web vulnerabilities.
const helmet = require("helmet");
const express = require("express");
const mongoose = require("mongoose");
// Cross-Origin Resource Sharing middleware that enables defining who can access resources on a web page or server.
const cors = require("cors");
// It captures and logs detailed information about each HTTP request, helping developers understand and debug incoming requests to the server.
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();
const { readdirSync } = require("fs");
const mongoSanitize = require("express-mongo-sanitize");
// Parses cookie headers and populates req.cookies with an object keyed by cookie names.
const cookieParser = require("cookie-parser");
// Middleware for compressing HTTP responses to reduce file size and improve transmission speed.
const compression = require("compression");
const app = express();

//parse json request url
app.use(express.json());
//parse json request body
app.use(express.urlencoded({ extended: true }));
//mongo request sanitizer
app.use(mongoSanitize());
//Enable cookie parser
app.use(cookieParser());
//gzip compression
app.use(compression());
// morgan
// app.use(morgan("dev"));

//cors
app.use(cors());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(helmet());
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self' trusted.com");
  next();
});
//routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//databases

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("database connected"))
  .catch((err) => console.log("error connecting", err));

let server;

const PORT = process.env.PORT;

server = app.listen(PORT, () => {
  console.log("Listening on port 8001");
});
