import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Projects from "./components/projects";
import Project from "./components/project";
import ErrorPage from "./error-page";
import ProjectForm from "./components/projectForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Projects />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/project/new", element: <ProjectForm /> },
      { path: "/project/:id", element: <Project /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
