import express from "express";
import {
  getData
} from "../controllers/dataController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getData);

export default router;