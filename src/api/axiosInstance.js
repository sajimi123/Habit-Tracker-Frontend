import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://habit-tracker-backend-lt76.onrender.com",
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  function (response) {
    console.log("API response received");
    return response;
  },
  function (error) {

    if (error.response) {
      const status = error.response.status;

      console.log("Status:", status);
      console.log("Server Response:", error.response.data);

      if (status === 401) {
        console.log("Unauthorized error");
      } else if (status === 404) {
        console.log("API is not found");
      } else if (status === 500) {
        console.log("Something went wrong on server");
      }

    } else if (error.request) {
      console.log("No response from the server");

    } else {
      console.log("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;