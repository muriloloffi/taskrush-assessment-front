import axios from "axios";
import { baseApiUrl } from "./constants";

export const useAxios = axios.create({
  baseURL: baseApiUrl,
});
