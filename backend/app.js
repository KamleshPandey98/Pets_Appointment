import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import appointmentRoutes from "./routes/appointment.js";

const app = express();

/// DB Connection

//Set up default mongoose connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB Connected");
  });

//Get the default connection
//Bind connection to error event (to get notification of connection errors)
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

/// Port
/// Starting Server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App is running at port :  ${port}`);
});

/// Middleswares
app.use(express.json());
app.use(cors());

/// My Routes
app.use("/api", appointmentRoutes);
