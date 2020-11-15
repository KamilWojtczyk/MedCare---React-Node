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
    user: req.user._id,
    name: "Name and Surname",
    age: 0,
    sex: "Sex",
    birth: "1900-01-01",
    pesel: 0,
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

    const updatedPatient = await patient.save();
    res.json(updatedPatient);
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
};
