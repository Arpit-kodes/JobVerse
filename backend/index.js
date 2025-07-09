// index.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

import userRoute        from "./routes/user.route.js";
import companyRoute     from "./routes/company.route.js";
import jobRoute         from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app = express();

/* -------------------------- core middlewares -------------------------- */
app.set("trust proxy", 1);                // 🛡️ allow secure cookies behind proxy
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ------------------------------   CORS   ------------------------------ */
const FRONTEND_WHITELIST = [
  "https://jobverse-arpit.vercel.app",    // production frontend
];

const corsOptions = {
  origin(origin, callback) {
    // Allow server‑to‑server / curl / Postman (no origin header)
    if (!origin) return callback(null, true);

    // In dev mode also allow any localhost
    const isLocal = /^http:\/\/localhost:\d+$/.test(origin);
    if (
      FRONTEND_WHITELIST.includes(origin) ||
      (process.env.NODE_ENV !== "production" && isLocal)
    ) {
      console.log("✅  CORS allowed:", origin);
      return callback(null, true);
    }
    console.log("⛔  CORS blocked:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,            // 🔑 send & receive cookies
};
app.use(cors(corsOptions));

/* ------------------------------- routes ------------------------------- */
app.use("/api/v1/user",        userRoute);
app.use("/api/v1/company",     companyRoute);
app.use("/api/v1/job",         jobRoute);
app.use("/api/v1/application", applicationRoute);

// simple health‑check
app.get("/api/v1/health", (_req, res) =>
  res.status(200).json({ success: true, message: "API is alive 🎉" })
);

/* --------------------------- start server ----------------------------- */
const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀  Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌  Failed to start server:", err);
    process.exit(1);
  }
}

start();
