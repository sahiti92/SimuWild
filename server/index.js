// const express = require("express");
// require("dotenv").config();
// const mongoose = require("mongoose");
// const app = express();

// const url = process.env.MONGODB_URL;

// // Custom CORS Middleware (Place this before route definitions)
// app.use(function (req, res, next) {
//   // Dynamically using the frontend URL from the environment variable
//   const clientURL = process.env.CLIENT_URL || "*"; // Default to "*" if CLIENT_URL is not defined

//   // Enabling CORS for the specific frontend URL
//   res.header("Access-Control-Allow-Origin", clientURL); // Allow the frontend URL defined in .env
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT"); // Allow specific methods
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
//   ); // Allow custom headers

//   // Preflight request handling
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200); // Respond with 200 to preflight request
//   }

//   next(); // Proceed with the request
// });

// mongoose
//   .connect(url)
//   .then(() => console.log("DB Connected"))
//   .catch((e) => console.log(e));

// // Your routes and other middleware
// app.use(express.json()); // To parse incoming JSON data
// app.use("/", require("./routes/userRouter")); // Your routes
// app.use(require("./middlewares/errorHandler")); // Error handling middleware
// const progressRouter = require("./routes/progress");
// app.use("/api/v1/progress", progressRouter);

// const PORT = process.env.PORT || 10000; // Your server port
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// MongoDB connection URL from environment variable
const url = process.env.MONGODB_URL;

// Configure CORS middleware
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://simuwild-1.onrender.com", // Production environment on Render
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // Allow requests with no origin (like mobile apps or Postman)
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,OPTIONS,POST,PUT", // Allowed HTTP methods
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization", // Allowed custom headers
  credentials: true, // Allow credentials (cookies, authorization headers)
};

// Enable CORS for the allowed origins
app.use(cors(corsOptions));

// MongoDB connection
mongoose
  .connect(url)
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log("DB connection error:", e));

// Middleware to parse incoming JSON data
app.use(express.json());

// Import your routes
const userRouter = require("./routes/userRouter");
const progressRouter = require("./routes/progress");

// Define routes
app.use("/", userRouter); // User-related routes
app.use("/api/v1/progress", progressRouter); // Progress-related routes

// Error handler middleware
app.use(require("./middlewares/errorHandler"));

// Server Port
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
