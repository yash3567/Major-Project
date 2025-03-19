import express from "express";
import { verification } from "../controllers/verifyEmail-controller.js"; // ✅ ES Module Import

const router = express.Router();

router.post("/verifyemail", verification);

export default router; // ✅ ES Module Export
