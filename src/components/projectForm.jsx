import { useState, useEffect } from "react";
import { useAxios } from "../helpers/useAxios";
import { useForm } from "react-hook-form";

function ProjectForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await useAxios.get("/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const onSubmit = async (data) => {
    try {
      await useAxios.post("/api/projects", data);
      alert("Project created successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label>
              Title:
              <input
                {...register("title", { required: true, maxLength: 100 })}
              />
              {errors.title && (
                <p>Title is required and should be less than 100 characters</p>
              )}
            </label>
          </div>

          <label>
            Description:
            <textarea
              {...register("description", { required: false, maxLength: 1000 })}
            />
            {errors.description && (
              <p>Description should be less than 1000 characters</p>
            )}
          </label>

          <label>
            Owner:
            <select {...register("owner_id", { required: true })}>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          <button type="submit">Create Project</button>
        </form>
      </div>
    </>
  );
}

export default ProjectForm;
