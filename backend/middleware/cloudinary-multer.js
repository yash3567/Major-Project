import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: file.mimetype.startsWith("image/") ? "project_images" : "project_files",
      resource_type: file.mimetype.startsWith("image/") ? "image" : "raw", // Handle raw files like PDFs, ZIPs, DOCX
      allowed_formats: ["pdf", "zip", "docx", "png", "jpg", "jpeg"],
    };
  },
});

const upload = multer({ storage });

export default upload;
