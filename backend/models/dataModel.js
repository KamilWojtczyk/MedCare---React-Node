import mongoose from "mongoose";

const bloodpressureSchema = mongoose.Schema({
  systolic: { type: Number, required: false },
  diastolic: { type: Number, required: false },
  time: { type: String, required: false },
});

const bloodsugarSchema = mongoose.Schema({
  sugar: { type: Number, required: true },
  time: { type: String, required: true },
});

const heartrateSchema = mongoose.Schema({
  heart: { type: Number, required: true },
  time: { type: String, required: true },
});

const saturationSchema = mongoose.Schema({
  sat: { type: Number, required: true },
  time: { type: String, required: true },
});

const dataSchema = mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  message: {
    id: { type: String, required: true },
    bloodpressure: [bloodpressureSchema],
    heartrate: [heartrateSchema],
    bloodsugar: [bloodsugarSchema],
    saturation: [saturationSchema],
  },
});

const Data = mongoose.model("Data", dataSchema);

export default Data;
