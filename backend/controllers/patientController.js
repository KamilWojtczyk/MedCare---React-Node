import asyncHandler from "express-async-handler";
import Patient from "../models/patientModel.js";

// @desc Get all patients
// @route Get /api/patients
// @access Private
const getPatients = asyncHandler(async (req, res) => {
  const pageSize = 9;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Patient.countDocuments({ ...keyword });

  const patients = await Patient.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  patients.sort();
  res.json({ patients, page, pages: Math.ceil(count / pageSize) });
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
    res.json({ message: "Patient removed" });
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
    pesel: "Pesel number",
    phone: "Phone number",
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

// @desc Create new bloodsugar
// @route POST /api/patients/:id/bloodsugar
// @access Private Admin
const createPatientBloodsugar = asyncHandler(async (req, res) => {
  const { sugar, time } = req.body;

  const patient = await Patient.findById(req.params.id);

  if (patient) {
    const bloodsugar = {
      sugar,
      time,
      user: req.user._id,
    };
    patient.bloodsugar.push(bloodsugar);
    await patient.save();
    res.status(201).json({ message: "Blood sugar added" });
  } else {
    res.status(404);
    throw new Error("Patient not found");
  }
});

// @desc Create new saturation
// @route POST /api/patients/:id/saturation
// @access Private Admin
const createPatientSaturation = asyncHandler(async (req, res) => {
  const { sat, time } = req.body;

  const patient = await Patient.findById(req.params.id);

  if (patient) {
    const saturation = {
      sat,
      time,
      user: req.user._id,
    };
    patient.saturation.push(saturation);
    await patient.save();
    res.status(201).json({ message: "Saturation added" });
  } else {
    res.status(404);
    throw new Error("Patient not found");
  }
});

// @desc Create new comment
// @route POST /api/patients/:id/comment
// @access Private Admin
const createPatientComment = asyncHandler(async (req, res) => {
  const { title, text } = req.body;

  const patient = await Patient.findById(req.params.id);

  if (patient) {
    const comment = {
      name: req.user.name,
      title,
      text,
      user: req.user._id,
    };
    patient.comment.push(comment);
    await patient.save();
    res.status(201).json({ message: "Comment added" });
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
  createPatientBloodsugar,
  createPatientSaturation,
  createPatientComment,
};
