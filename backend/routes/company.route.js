import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
  deleteCompany,
} from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// ✅ All routes below require user to be authenticated

// 🏢 Register a new company
// POST /api/v1/company/register
router.post("/register", isAuthenticated, registerCompany);

// 📦 Get all companies created by logged-in user
// GET /api/v1/company/get
router.get("/get", isAuthenticated, getCompany);

// 🔍 Get a specific company by ID
// GET /api/v1/company/get/:id
router.get("/get/:id", isAuthenticated, getCompanyById);

// ✏️ Update a company by ID (supports logo upload)
// PUT /api/v1/company/update/:id
router.put("/update/:id", isAuthenticated, singleUpload, updateCompany);

// ❌ Delete a company by ID
// DELETE /api/v1/company/delete/:id
router.delete("/delete/:id", isAuthenticated, deleteCompany);

export default router;
