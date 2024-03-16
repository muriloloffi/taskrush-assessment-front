import { useFetch } from "../useFetch";
import { Link } from "react-router-dom";

function Projects() {
  const { data: projects, loading, error } = useFetch("/api/projects");

  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
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
  );
}

export default Projects;
