import axios from "axios";

//dont forget to set REACT_APP_API_URL in herokuapp
const apiBaseUrl = import.meta.env.REACT_APP_API_URL || "http://localhost:5000";

const axiosPath = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  "Access-Control-Allow-Origin": "http://localhost:5000",
});

export default axiosPath;
