import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Projects from "./components/Projects";
import Project from "./components/Project";

const router = createBrowserRouter([
  { path: "/", element: <Projects /> },
  { path: "/project/:id", element: <Project /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
