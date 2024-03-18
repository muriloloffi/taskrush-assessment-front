import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFetch } from "../useFetch";
import Task from "./task";

export function Project() {
  const { id } = useParams();
  const { data: project, loading } = useFetch(`/api/project/${id}`);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Link to="/">Fechar ✕</Link>
      <div className="flex flex-col">
        <h1 className="">{project.title}</h1>
        <p>{project.description}</p>
        <h2>Tasks</h2>
        <ul>
          {project.tasks.map((task) => (
            <li key={task.id}>
              <div>
                <Task task={task} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Project;
