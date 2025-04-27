import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5250",
});

export default api;
