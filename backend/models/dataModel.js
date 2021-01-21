import mongoose from "mongoose";

const bloodpressureSchema = mongoose.Schema({
  systolic: { type: Number, required: false },
  diastolic: { type: Number, required: false },
  time: { type: String, required: false },
});

const bloodsugarSchema = mongoose.Schema({
  sugar: { type: Number, required: false },
  time: { type: String, required: false },
});

const heartrateSchema = mongoose.Schema({
  heart: { type: Number, required: false },
  time: { type: String, required: false },
});

const saturationSchema = mongoose.Schema({
  sat: { type: Number, required: false },
  time: { type: String, required: false },
});

const dataSchema = mongoose.Schema({
  topic: {
    type: String,
    required: false,
  },
  message: {
    id: { type: String, required: false },
    bloodpressure: [bloodpressureSchema],
    heartrate: [heartrateSchema],
    bloodsugar: [bloodsugarSchema],
    saturation: [saturationSchema],
  },
});

const Data = mongoose.model("Data", dataSchema);

export default Data;
