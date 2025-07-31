import axios from "axios";
import axiosInstance from "../../axiosInstance";
import store from "../store";

export const getMovie = async (movieTitle) => {
    const state = store.getState();
    const selectedLanguage = state.movies.language;
    try {
        const { data } = await axiosInstance.get(
            `/search/movie?query=${movieTitle}&language=${selectedLanguage}`
        );
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getGenres = async () => {
    const state = store.getState();
    const selectedLanguage = state.movies.language;
    try {
        const { data } = await axiosInstance.get(
            `/genre/movie/list?language=${selectedLanguage}`
        );
        return data.genres;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const saveMovies = async (movieList) => {
    try {
        await axios.put("https://dummybackend.com/save", {
            movieList,
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};
