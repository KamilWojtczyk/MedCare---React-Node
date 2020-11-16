import asyncHandler from "express-async-handler";
import Patient from "../models/patientModel.js";

// @desc Get all patients
// @route Get /api/patients
// @access Private
const getPatients = asyncHandler(async (req, res) => {
  const patients = await Patient.find({});
  res.json(patients);
});

// @desc Fetch single patients
// @route Get /api/patients/:id
// @access Private
const getPatientById = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(404);
    throw new Error("Patient not found");
  }
});

// @desc Delete a patients
// @route DElete /api/patients/:id
// @access Private Admin
const deletePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (patient) {
    await patient.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Patient not found");
  }
});

// @desc Create a patient
// @route POST /api/patients
// @access Private Admin
const createPatient = asyncHandler(async (req, res) => {
  const patient = new Patient({
    nameUser: req.user.name,
    user: req.user._id,
    name: "Name and Surname",
    age: 0,
    sex: "Sex",
    birth: "1980-01-01",
    phone: 0,
    pesel: 0,
    email: "email@example.com",
    weight: 0,
    height: 0,
    stepcount: 0,
  });

  const createdPatient = await patient.save();
  res.status(201).json(createdPatient);
});

// @desc Update a patient
// @route PUT /api/patients/:id
// @access Private Admin
const updatePatient = asyncHandler(async (req, res) => {
  const {
    name,
    age,
    sex,
    birth,
    phone,
    pesel,
    email,
    weight,
    height,
    stepcount,
    isArchived,
  } = req.body;

  const patient = await Patient.findById(req.params.id);

  if (patient) {
    patient.name = name;
    patient.age = age;
    patient.sex = sex;
    patient.birth = birth;
    patient.phone = phone;
    patient.pesel = pesel;
    patient.email = email;
    patient.weight = weight;
    patient.height = height;
    patient.stepcount = stepcount;
    patient.isArchived = isArchived;

    const updatedPatient = await patient.save();
    res.json(updatedPatient);
  } else {
    res.status(404);
    throw new Error("Patient not found");
  }
});

// @desc Create new bloodpressure
// @route POST /api/patients/:id/bloodpressure
// @access Private Admin
const createPatientBloodpressure = asyncHandler(async (req, res) => {
  const { blood, time } = req.body;

  const patient = await Patient.findById(req.params.id);

  if (patient) {
    const bloodpressure = {
      blood,
      time,
      user: req.user._id,
    };
    patient.bloodpressure.push(bloodpressure);
    await patient.save();
    res.status(201).json({ message: "Blood pressure added" });
  } else {
    res.status(404);
    throw new Error("Patient not found");
  }
});

// @desc Create new heartrate
// @route POST /api/patients/:id/heartrate
// @access Private Admin
const createPatientHeartrate = asyncHandler(async (req, res) => {
  const { heart, time } = req.body;

  const patient = await Patient.findById(req.params.id);

  if (patient) {
    const heartrate = {
      heart,
      time,
      user: req.user._id,
    };
    patient.heartrate.push(heartrate);
    await patient.save();
    res.status(201).json({ message: "Heart rate added" });
  } else {
    res.status(404);
    throw new Error("Patient not found");
  }
});

export {
  getPatients,
  getPatientById,
  deletePatient,
  createPatient,
  updatePatient,
  createPatientBloodpressure,
  createPatientHeartrate,
};
