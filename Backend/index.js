const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const progressRouter = require("./routes/progress"); // Changed to `progressRouter`
const errorHandler = require("./middlewares/errorHandler");

mongoose
  .connect(
    "mongodb+srv://cs22b027:Mt4K37HNfQYF50W5@simuwild.azzap.mongodb.net/?retryWrites=true&w=majority&appName=SimuWild"
  )
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));

const corsOptions = {
  origin: ["http://localhost:5173"],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.use("/", userRouter);
app.use("/api/v1/progress", progressRouter); // Updated route to `/api/v1/progress`

app.use(errorHandler);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
