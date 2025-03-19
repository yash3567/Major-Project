import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/layouts/Layout";
import Project_Structure from "./Project_Structure";
import SearchIcon from "@mui/icons-material/Search";

const Projects = () => {
  const [projectdata, setProjectData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(() => {
    return Number(localStorage.getItem("currentPage")) || 1;
  });

  const projectsPerPage = 9;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/projectpage")
      .then((result) => {
        setProjectData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Update localStorage when page changes
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  // Filter projects based on search term
  const filteredProjects = projectdata.filter((project) =>
    project.techused.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current projects for the page
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  // Total Pages
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  return (
    <Layout>
      {/* Search Bar */}
      <div className="flex justify-center mt-3 mb-4">
  <div className="relative w-1/2" style={{ width: "350px" }}>
    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
    <input
      type="text"
      placeholder="Search Your Domain..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full px-10 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</div>

      {/* Projects Section */}
      <div className="flex flex-wrap justify-center">
        {currentProjects.length > 0 ? (
          currentProjects.map((project, i) => <Project_Structure projects={project} key={i} />)
        ) : (
          <p className="text-gray-600 text-center">No projects found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg shadow ${
              currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-800 text-white"
            }`}
          >
            Previous
          </button>

          {/* Page Number Buttons */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-lg font-semibold transition ${
                currentPage === index + 1
                  ? "bg-blue-800 text-white border-blue-800"
                  : "bg-white text-gray-700 border-gray-400 hover:bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage >= totalPages}
            className={`px-4 py-2 rounded-lg shadow ${
              currentPage >= totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-800 text-white"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </Layout>
  );
};

export default Projects;
