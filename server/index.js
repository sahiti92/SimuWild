const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();

const url = process.env.MONGODB_URL;

// Custom CORS Middleware (Place this before route definitions)
app.use(function (req, res, next) {
  // Dynamically using the frontend URL from the environment variable
  const clientURL = process.env.CLIENT_URL || "*"; // Default to "*" if CLIENT_URL is not defined
  
  // Enabling CORS for the specific frontend URL
  res.header("Access-Control-Allow-Origin", clientURL); // Allow the frontend URL defined in .env
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT"); // Allow specific methods
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"); // Allow custom headers
  
  // Preflight request handling
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Respond with 200 to preflight request
  }
  
  next(); // Proceed with the request
});

mongoose
  .connect(url)
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));

// Your routes and other middleware
app.use(express.json()); // To parse incoming JSON data
app.use("/", require("./routes/userRouter")); // Your routes
app.use(require("./middlewares/errorHandler")); // Error handling middleware

const PORT = process.env.PORT || 10000; // Your server port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
