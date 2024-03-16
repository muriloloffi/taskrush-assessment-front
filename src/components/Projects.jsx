import { useFetch } from "../useFetch";
import { Link, Outlet } from "react-router-dom";

function Projects() {
  const { data: projects, loading, error } = useFetch("/api/projects");
  const loadingStyles = "opacity-25";

  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="flex flex-col items-start">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-4 m-2 bg-gray-100 rounded-md shadow-md"
          >
            <Link to={`/project/${project.id}`}>{project.title}</Link>
          </div>
        ))}
      </div>
      <div
        className={`flex-1 py-8 px-16 w-full ${loading ? loadingStyles : ""}`}
      >
        <Outlet />
      </div>
    </>
  );
}

export default Projects;
