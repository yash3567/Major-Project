import { useState } from "react";
import Layout from "./../../components/layouts/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProjectForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [abstract, setAbstract] = useState("");
  const [degree, setDegree] = useState("");
  const [password, setPassword] = useState("");
  const [projectname, setProjectName] = useState("");
  const [type, setType] = useState("student");
  const [projectfile, setProjectFile] = useState(null);
  const [link, setLink] = useState("");
  const [techused, setTechUsed] = useState("");
  const [price, setPrice] = useState("");
  const [projectImage, setProjectImage] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (e) => setProjectFile(e.target.files[0]);
  const handleImageChange = (e) => setProjectImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("abstract", abstract);
    formData.append("degree", degree);
    formData.append("password", password);
    formData.append("projectname", projectname);
    formData.append("type", type);
    formData.append("link", link);
    formData.append("techused", techused);
    formData.append("price", price);
    formData.append("projectfile", projectfile);
    formData.append("projectImage", projectImage);

    try {
      const projectResult = await axios.post("http://localhost:5000/api/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (projectResult.data.success) {
        alert("Project Pushed Successfully");
        navigate("/project");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div
        className="min-h-screen  dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col lg:flex-row"
      >

        <div className="hidden lg:flex items-center justify-center w-1/2 p-10 cursor-pointer">
          <img src="/svg/register.svg" alt="Register Illustration" className="w-100 h-100" />
        </div>


        <form
          className="w-full lg:w-2/3 max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-8 mb-6 bg-opacity-90 "
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Add Your Project</h2>

          {/* Two Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <input type="text" className="border rounded-md p-2 w-full cursor-pointer" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" className="border rounded-md p-2 w-full cursor-pointer" placeholder="Domain-Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <input type="text" className="border rounded-md p-2 w-full cursor-pointer" placeholder="Abstract" value={abstract} onChange={(e) => setAbstract(e.target.value)} />
            <input type="text" className="border rounded-md p-2 w-full cursor-pointer" placeholder="Technologies Used" value={techused} onChange={(e) => setTechUsed(e.target.value)} />

            <input type="text" className="border rounded-md p-2 w-full cursor-pointer" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input type="password" className="border rounded-md p-2 w-full cursor-pointer" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            {type === "student" && (
              <>
                <input type="text" className="border rounded-md p-2 w-full cursor-pointer" placeholder="Project Name" value={projectname} onChange={(e) => setProjectName(e.target.value)} />
                <select className="border rounded-md p-2 w-full cursor-pointer" value={degree} onChange={(e) => setDegree(e.target.value)}>
                  <option value="">Select your degree</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Doctorate">Doctorate</option>
                </select>
              </>
            )}

            <div className="col-span-2 flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="type" checked={type === "student"} onChange={() => setType("student")} /> Student
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="type" checked={type === "institute"} onChange={() => setType("institute")} /> Institute
              </label>
            </div>

            {/* Full width for file upload */}
            <div className="col-span-2">
              <label className="block text-sm font-medium ">Upload Project File</label>
              <input type="file" className="border rounded-md p-2 w-full " onChange={handleFileChange} />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium">Upload Project Image</label>
              <input type="file" className="border rounded-md p-2 w-full" accept="image/*" onChange={handleImageChange} />
            </div>

            <input type="url" className="border rounded-md p-2 w-full col-span-2 cursor-pointer" placeholder="Deployed Project URL" value={link} onChange={(e) => setLink(e.target.value)} required />
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Add Project
          </button>
        </form>
      </div>
    </Layout>




  );
};

export default ProjectForm;
