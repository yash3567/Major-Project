import express from "express";
import multer from "multer";
import { handleProjects, projectData } from "../controllers/project-controller.js";

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});


const upload = multer({ storage: storage });

router.post("/projects", 
  upload.fields([
    { name: "projectfile", maxCount: 1 },
    { name: "projectImage", maxCount: 1 }
  ]), 
  handleProjects
);

// get Route for Project Getting from DB
router.get("/projectpage", projectData);

export default router;
