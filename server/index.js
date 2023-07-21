const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4040;
const cors = require("cors");

const userRoute = require("./routes/userRoutes");

//========== Database Connection =================

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI).then(
  () => {
    console.log("MESSAGE: MONGODB IS CONNECTED");
  },
  (err) => {
    // handle initial connection error
    console.log(err + " ERROR MESSAGE: MONGODB IS NOT CONNECTED ");
  }
);

// handle errors after initial connection
mongoose.connection.on("error", (err) => {
  console.log(err + " ERROR MESSAGE: MONGODB CONNECTION ERROR ");
});

mongoose.connection.on("disconnected", () => {
  console.log(" MESSAGE: MONGODB IS DISCONNECTED ");
});

//========== Middlewares ==========================
app.use(cors());
app.use(express.json());
app.use("/users", userRoute);

//========== Error Handler Middleware ==============

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Internal Server Error";

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
});

//===================================================

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
