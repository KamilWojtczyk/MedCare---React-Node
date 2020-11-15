import express from "express";
import {
  getPatients,
  getPatientById,
  deletePatient,
  updatePatient,
  createPatient,
} from "../controllers/patientController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(protect, getPatients).post(protect, admin, createPatient);

router
  .route("/:id")
  .get(protect, getPatientById)
  .delete(protect, admin, deletePatient)
  .put(protect, admin, updatePatient);

export default router;
