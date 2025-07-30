import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyY2NjYjQ1MWM2MDhlY2ZmYTgxMzkwZDRjNmI5ZjQ0NiIsIm5iZiI6MTc1Mzc4ODY0Ny44ODYwMDAyLCJzdWIiOiI2ODg4YjBlNzM5ZjIxOTY3YzVkOWJlMGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.exBT9g6jwzBjyhg8vpGDPBUXNbSGn2yzYgt8j2nO23U",
    },
});

export default axiosInstance;
