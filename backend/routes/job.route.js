import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
  updateJob, // ✅ Include update controller
} from "../controllers/job.controller.js";

const router = express.Router();

// Create a job
router.route("/post").post(isAuthenticated, postJob);

// Get all jobs for all users
router.route("/get").get(isAuthenticated, getAllJobs);

// Get jobs posted by the logged-in recruiter/admin
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);

// Get single job by ID
router.route("/get/:id").get(isAuthenticated, getJobById);

// ✅ Update job by ID (only by the job owner)
router.route("/update/:id").put(isAuthenticated, updateJob);

export default router;
