import axios from "axios";

const API = "http://localhost:3000/";

const api = axios.create({
  baseURL: API,
});

export default api;
