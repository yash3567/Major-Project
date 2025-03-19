import { useState } from "react";
import Layout from "../../components/layouts/Layout";
import { Link, useLocation } from "react-router-dom";


const ProjectDetails = () => {
  const { state } = useLocation();
  const { projectdetails } = state;
  const [showBuyModal, setShowBuyModal] = useState(false);

  if (!projectdetails) {
    return <div className="text-center text-red-600 text-lg">Error: Project details not found. Please go back to the home page.</div>;
  }

  const isZipFile = projectdetails?.projectfile?.filename?.endsWith(".zip") || false;


  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = projectdetails.projectfile;
    link.download = projectdetails.projectname + ".zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="border-double border-4 border-gray-600 p-6 rounded-lg shadow-lg bg-white max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-6">
            {/* ✅ Project Image */}
            <div className="flex justify-center items-center">
              {projectdetails.projectImage ? (
                <img
                  src={projectdetails.projectImage}
                  alt="Project Image"
                  className="h-60 w-100 object-cover rounded-lg border border-gray-400" style={{ height: "270px" }}
                />
              ) : (
                <div className="h-52 w-96 flex items-center justify-center border border-gray-400 rounded-lg bg-gray-100">
                  <p className="text-gray-600">No Image Available</p>
                </div>
              )}
            </div>


            <div className="p-4">
              <h2 className="text-2xl font-bold text-yellow-600">{projectdetails.projectname}</h2>
              <p className="text-gray-700 text-lg mt-3">
                <span className="font-semibold ">Owner:</span>
                <span className="text-blue-600 ml-2">{projectdetails.name}</span>
                <br />
                (<span className="text-red-600">{projectdetails.type}</span> -
                <span className="text-red-600">{projectdetails.degree}</span>)
              </p>
              <p className="text-gray-700 text-lg mt-6">
                <span className="font-semibold">Tech Stack:</span>
                <span className="text-purple-600 ml-2">{projectdetails.techused}</span>
              </p>
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Abstract:</h3>
                <p className="text-gray-600 mt-2">{projectdetails.abstract}</p>
              </div>
              <div className="mt-6 flex justify-between">
                {projectdetails.link ? (
                  <Link to={projectdetails.link} target="_blank" rel="noopener noreferrer">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">Visit Project</button>
                  </Link>
                ) : (
                  <button className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow cursor-not-allowed" disabled>
                    No Project Link Available
                  </button>
                )}

                {isZipFile ? (
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
                    onClick={() => setShowBuyModal(true)}
                  >
                    Download ZIP
                  </button>
                ) : (
                  <button
                    type="button"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Buy {projectdetails.price} ₹
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Buy & Download Modal */}
        {showBuyModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold">Buy Project</h2>
              <p className="mt-2">
                To download this project, please proceed with the payment.
                <span className="font-semibold text-lg text-green-600"> ₹{projectdetails.price}</span>
              </p>

              <div className="mt-4 flex justify-end">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                  onClick={() => setShowBuyModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  onClick={() => {
                    setShowBuyModal(false);
                    handleDownload();
                  }}
                >
                  Buy & Download
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProjectDetails;
