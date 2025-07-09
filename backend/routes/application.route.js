import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

// 📌 Apply to a job (POST)
router.post("/apply/:id", isAuthenticated, applyJob);

// 📌 Get all jobs the logged-in user applied to
router.get("/get", isAuthenticated, getAppliedJobs);

// 📌 Get all applicants for a specific job (admin only)
router.get("/:id/applicants", isAuthenticated, getApplicants);

// 📌 Update the application status for a specific applicant
router.post("/status/:id/update", isAuthenticated, updateStatus);

export default router;
