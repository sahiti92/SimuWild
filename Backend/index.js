const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const router = require("./routes/progress");
const errorHandler = require("./middlewares/errorHandler");
//const url = process.env.MONGODB_URL;
//! user:cs22b027
//! pass: Mt4K37HNfQYF50W5
mongoose
  .connect(
    "mongodb+srv://cs22b027:Mt4K37HNfQYF50W5@simuwild.azzap.mongodb.net/?retryWrites=true&w=majority&appName=SimuWild"
    //url
  )
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));

const corsOptions = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/", userRouter);
app.use("/progress", router);
app.use(errorHandler);
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Server running on port..${PORT}`));
