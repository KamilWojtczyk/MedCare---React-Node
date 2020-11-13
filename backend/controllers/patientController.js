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
// @access Public
const getPatientById = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(404);
    throw new Error("Patient not found");
  }
});

export { getPatients, getPatientById };
