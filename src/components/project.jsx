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
      <Link to="/">
        <div>Fechar ✕</div>
      </Link>
      <div className="flex flex-col rounded">
        <div className="flex flex-col justify-center shadow rounded bg-white">
          <div className="flex flex-row">
            <span className="font-medium">Projeto:&nbsp;</span>
            <h1>{project.title}</h1>
          </div>
          <div className="flex flex-row">
            <span className="font-medium">Descrição:&nbsp;</span>
            <p>{project.description}</p>
          </div>
          <hr />
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-medium mt-2">Tasks:</h2>
          {project.tasks.map((task) => (
            <Task task={task} key={"task" + task.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Project;
