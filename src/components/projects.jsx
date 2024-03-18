import { useFetch } from "../useFetch";
import { Link, Outlet } from "react-router-dom";
import { routes } from "../helpers/constants";

function Projects() {
  const { data: projects, loading } = useFetch(routes.projectsRoute);
  const loadingStyles = "opacity-25";

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="flex flex-col items-center w-80 border-r border-solid border-slate-200">
        <h1 className="text-2xl font-bold text-center w-full">Projetos</h1>
        {projects.map((project) => (
          <Link to={`/project/${project.id}`} key={project.id}>
            <div className="p-4 m-2 bg-gray-300 rounded-md shadow-md text-blue-500 hover:shadow-slate-300">
              {project.title}
            </div>
          </Link>
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
