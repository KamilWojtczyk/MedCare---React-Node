import express from "express";
import { authUser, getUserProfile } from "../controllers/userController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);

export default router;
