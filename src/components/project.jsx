import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useFetch } from "../useFetch";
import Task from "./task";

export function Project() {
  const { id } = useParams();
  const { data: project, error, loading } = useFetch(`/api/project/${id}`);
  const [time, setTime] = useState(new Date());

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Link to="/">Back to projects</Link>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
      <h2>Tasks</h2>
      <ul>
        {project.tasks.map((task) => (
          <li key={task.id}>
            <Task task={task} />
          </li>
        ))}
      </ul>
      <p>
        <strong>Current time:</strong> {format(time, "PPpp")}
      </p>
    </div>
  );
}

export default Project;
