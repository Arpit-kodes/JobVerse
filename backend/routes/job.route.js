import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
  updateJob,
  deleteJob,
} from "../controllers/job.controller.js";

const router = express.Router();

// ✅ Create a job (requires login)
router.post("/post", isAuthenticated, postJob);

// ✅ Get all jobs for users (public)
router.get("/all-jobs", getAllJobs);

// ✅ Get all jobs posted by logged-in admin
router.get("/getadminjobs", isAuthenticated, getAdminJobs);

// ✅ Get single job (made public)
router.get("/get/:id", getJobById); // ✅ No auth required

// ✅ Update job by ID (requires login)
router.put("/update/:id", isAuthenticated, updateJob);

// ✅ Delete job by ID (requires login)
router.delete("/delete/:id", isAuthenticated, deleteJob);

export default router;
