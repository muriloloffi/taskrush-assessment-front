import axios from "axios";
import { routes } from "./constants";

export const useAxios = axios.create({
  baseURL: routes.baseURL,
});
