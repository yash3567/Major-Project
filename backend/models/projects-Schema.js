// import mongoose from "mongoose";

// const projectSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     projectname: { type: String, required: true },
//     abstract: { type: String, required: true },
//     link: { type: String, required: true },
//     password: { type: String, required: true },
//     techused: { type: String, required: true },
//     degree: { type: String },
//     type: { type: String },
//     price: { type: Number, required: true },
//     // projectfile: { type: String, required: true },
//     projectfile: {
//     filename: String,
//     fileData: String, // Store as Base64
//     contentType: String,
//   },
//     projectImage: { type: String, required: true }, // New field for project image
//   },
//   { timestamps: true }
// );-------------------------------------> Dont tamper with this file & code  as it is not part of the project

// const projects = mongoose.model("projects", projectSchema);
// export default projects; // ✅ Use default export
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    projectname: { type: String, required: true },
    abstract: { type: String, required: true },
    link: { type: String, required: true },
    password: { type: String, required: true },
    techused: { type: String, required: true },
    degree: { type: String },
    type: { type: String },
    price: { type: Number, required: true },
    projectfile: {
      filename: String,
      fileUrl: String,  // Store Cloudinary URL instead of Base64
      contentType: String,
    },
    projectImage: { type: String, required: true },
  },
  { timestamps: true }
);

const projects = mongoose.model("projects", projectSchema);
export default projects;
