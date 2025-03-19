import { useState } from "react";
import "./ProjectStructure.css";
import { Link } from "react-router-dom";

const Project_Structure = ({ projects }) => {
  const [readMore, setReadMore] = useState(false);
  const abstractPreview = projects.abstract.slice(0, 100); // Show only 100 characters

  return (
    <div className="main_div col-lg-4 col-sm-6">
      <div className="card shadow-lg rounded-lg p-4 min-h-[400px] flex flex-col justify-between h-full">
        {/* Project Image */}
        <div className="image-holder h-48 w-full flex items-center justify-center border border-gray-300 rounded-lg bg-gray-100">
          {projects.projectImage ? (
            <img
              src={projects.projectImage}
              alt="Project"
              className="h-full w-full object-cover rounded-lg"
            />
          ) : (
            <p className="text-gray-500">No Image Available</p>
          )}
        </div>

        {/* Project Details */}
        <div className="projectDetails mt-4">
          <h1 className="projectName mt-3 mb-2 text-xl font-bold">{projects.projectname}</h1>
          <h6 className="techStack text-sm text-gray-700 mb-2">{projects.techused}</h6>

          {/* Abstract with Read More */}
          <p className="abstract text-gray-600">
            {readMore ? projects.abstract : `${abstractPreview}...`}
            {projects.abstract.length > 100 && (
              <button
                onClick={() => setReadMore(!readMore)}
                className="text-blue-600 font-semibold ml-2"
              >
                {readMore ? "Read Less" : "Read More"}
              </button>
            )}
          </p>

          {/* Buttons */}
          <div className="mt-4 flex justify-between">
            <Link to={"/projectdetails"} state={{ projectdetails: projects }}>
              <button className="btn btn_color px-4 py-2 rounded-lg shadow bg-blue-600 text-white hover:bg-blue-700">
                See Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project_Structure;
