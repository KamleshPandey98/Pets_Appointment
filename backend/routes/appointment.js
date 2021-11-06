import express from "express";
import { check } from "express-validator";
var router = express.Router();

import {
  addAppointment,
  deleteAppointment,
  getAllAppointments,
  getAppointmentById,
} from "../controllers/appointment.js";

router.param("id", getAppointmentById);
router.get("/apt", getAllAppointments);
router.post(
  "/saveApt",
  check("ownerName")
    .exists()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("name should be at least 3 char"),
  check("petName").exists().notEmpty().withMessage("Pet name should be given"),
  check("aptDate")
    .exists()
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage("Appointment Date is not selected"),
  addAppointment
);
router.delete("/delete/:id", deleteAppointment);

export default router;
