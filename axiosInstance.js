import axios from "axios";

const key = import.meta.env.VITE_TMDB_API_KEY;

const axiosInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${key}`,
    },
});

export default axiosInstance;
