import express from "express";
import {
  getPatients,
  getPatientById,
  getPatientWithDataById,
  deletePatient,
  updatePatient,
  createPatient,
  createPatientBloodpressure,
  createPatientHeartrate,
  createPatientBloodsugar,
  createPatientSaturation,
  createPatientComment,
} from "../controllers/patientController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(protect, getPatients).post(protect, admin, createPatient);
router
  .route("/:id/bloodpressure")
  .post(protect, admin, createPatientBloodpressure);
router.route("/:id/heartrate").post(protect, admin, createPatientHeartrate);
router.route("/:id/bloodsugar").post(protect, admin, createPatientBloodsugar);
router.route("/:id/saturation").post(protect, admin, createPatientSaturation);
router.route("/:id/comment").post(protect, admin, createPatientComment);

router
  .route("/:id")
  .get(protect, getPatientById)
  .delete(protect, admin, deletePatient)
  .put(protect, admin, updatePatient);

router
  .route("/patientWithData/:id")
  .get(protect, getPatientWithDataById)

export default router;
