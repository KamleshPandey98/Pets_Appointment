import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    ownerName: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    petName: {
      type: String,
      maxlength: 32,
      trim: true,
      required: true,
    },
    aptDate: {
      type: String,
      trim: true,
      required: true,
    },
    aptNotes: {
      type: String,
    },
  },
  { timestamps: true }
);

// Compile model from schema
export default mongoose.model("Appointment", appointmentSchema);
