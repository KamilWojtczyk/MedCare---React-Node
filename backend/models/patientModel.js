import mongoose from "mongoose";

const bloodpressureSchema = mongoose.Schema(
  {
    blood: { type: String, required: true },
    time: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const bloodsugarSchema = mongoose.Schema(
  {
    bloodsugar: { type: String, required: true },
    time: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const heartrateSchema = mongoose.Schema(
  {
    heart: { type: String, required: true },
    time: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const saturationSchema = mongoose.Schema(
  {
    saturation: { type: String, required: true },
    time: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const patientSchema = mongoose.Schema(
  {
    nameUser: { type: String, required: false },
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
    phone: {
      type: String,
      required: false,
    },
    pesel: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    weight: {
      type: Number,
      required: false,
    },
    height: {
      type: Number,
      required: false,
    },
    stepcount: {
      type: Number,
      required: false,
    },
    isArchived: {
      type: Boolean,
      required: false,
      default: false,
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
