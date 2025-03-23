import { checkHashedPassword, hashPassword } from "../authentication/auth-helper.js";
import projects from "../models/projects-Schema.js";
import usersPassword from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // Import file system module

export const handleProjects = async (req, res) => {
  try {
    const { name, email, projectname, abstract, link, password, degree, type, techused, price } = req.body;

    if (!req.files || !req.files.projectfile || !req.files.projectImage) {
      return res.status(400).json({ success: false, message: "Files missing" });
    }

    const encryptedPassword = await hashPassword(password);

    // ✅ Upload only the project image to Cloudinary
    const projectImageUpload = await cloudinary.uploader.upload(req.files.projectImage[0].path, {
      folder: "project_images",
    });

    // ✅ Read project file and store as a buffer in MongoDB
    const projectFileBuffer = fs.readFileSync(req.files.projectfile[0].path); // Read file
    const projectFileBase64 = projectFileBuffer.toString("base64"); // Convert to base64 string

    // ✅ Create project entry in MongoDB
    const projt = await projects.create({
      name,
      email,
      projectname,
      abstract,
      link,
      password: encryptedPassword,
      degree,
      type,
      techused,
      price,
      projectfile: {
        filename: req.files.projectfile[0].originalname, // Save filename
        fileData: projectFileBase64, // Save file as Base64
        contentType: req.files.projectfile[0].mimetype, // Save file type
      },
      projectImage: projectImageUpload.secure_url, // Save Cloudinary image URL
    });

    res.json({
      success: true,
      message: "Project Uploaded Successfully",
      projt,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to Upload the project",
      error: error.message,
    });
  }
};
export const projectData = async (req, res) => {
  try {
    const dataProjects = await projects.find({});

    // Convert file back to buffer for download
    const projectsWithFiles = dataProjects.map((project) => ({
      ...project.toObject(),
      projectfile: {
        filename: project.projectfile.filename,
        contentType: project.projectfile.contentType,
        fileData: `data:${project.projectfile.contentType};base64,${project.projectfile.fileData}`, // Convert Base64 back
      },
    }));

    res.json(projectsWithFiles);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
      error: error.message,
    });
  }
};
