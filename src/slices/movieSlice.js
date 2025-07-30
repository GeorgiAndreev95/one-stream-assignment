import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movieList: [],
    language: "en-US",
    genres: [],
};

export const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setMovieList: (state, action) => {
            state.movieList = action.payload;
        },
        setResultLanguage: (state, action) => {
            state.language = action.payload;
        },
        setGenres: (state, action) => {
            state.genres = action.payload;
        },
        removeMovie: (state, action) => {
            const movieId = action.payload;
            state.movieList = state.movieList.filter(
                (movie) => movie.movieDetails.id !== movieId
            );
        },
    },
});

export const { setMovieList, removeMovie, setGenres, setResultLanguage } =
    movieSlice.actions;

export default movieSlice.reducer;
