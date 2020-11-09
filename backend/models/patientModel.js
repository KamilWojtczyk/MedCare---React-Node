import mongoose from "mongoose";

const bloodpressureSchema = mongoose.Schema(
  {
    blood: { type: String, required: true },
    time: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const bloodsugarSchema = mongoose.Schema(
  {
    bloodsugar: { type: String, required: true },
    time: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const heartrateSchema = mongoose.Schema(
  {
    heart: { type: String, required: true },
    time: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const saturationSchema = mongoose.Schema(
  {
    saturation: { type: String, required: true },
    time: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const patientSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    birth: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    stepcount: {
      type: Number,
      required: true,
    },
    bloodpressure: [bloodpressureSchema],
    heartrate: [heartrateSchema],
    bloodsugar: [bloodsugarSchema],
    saturation: [saturationSchema],
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
