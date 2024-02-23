import axios from "axios";

//dont forget to set REACT_APP_API_URL in herokuapp
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const axiosPath = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  "Access-Control-Allow-Origin": apiBaseUrl,
});

export default axiosPath;
