import express from "express";
import {
  getPatients,
  getPatientById,
} from "../controllers/patientController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(protect, getPatients);

router.route("/:id").get(protect, getPatientById);

export default router;
