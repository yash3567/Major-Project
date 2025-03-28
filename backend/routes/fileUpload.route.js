// import express from "express";
// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import { v2 as cloudinary } from "cloudinary";
// import dotenv from "dotenv";

// dotenv.config();

// const router = express.Router();

// // Configure Cloudinary storage for multer
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "uploads", // Folder name in Cloudinary
//     allowed_formats: ["pdf", "zip", "docx"],
//   },
// });

// const upload = multer({ storage });

// // const upload = multer({ 
// //   storage,
// //   limits: {
// //     fileSize: 50 * 1024 * 1024, // 50MB limit
// //   },
// // });


// // File upload route
// router.post("/upload", upload.single("file"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     res.status(200).json({
//       message: "File uploaded successfully",
//       fileUrl: req.file.path, // Cloudinary URL
//     });
//   } catch (error) {
//     console.error("Upload error:", error);
//     res.status(500).json({ message: "File upload failed", error });
//   }
// });

// export default router; -------> Dont tamper with this file & code  as it is not part of the project

import express from "express";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import upload from "../middleware/cloudinary-multer.js"; // Import the new upload config

dotenv.config();

const router = express.Router();

// File upload route (handling both images and project files)
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.status(200).json({
      message: "File uploaded successfully",
      fileUrl: req.file.path, // Cloudinary URL
    });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "File upload failed", error });
  }
});

export default router;
