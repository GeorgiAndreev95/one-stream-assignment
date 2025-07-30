import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "./Button";
import MovieCard from "./MovieCard";
import SearchIcon from "../assets/search.svg?react";
import { saveMovies, getMovie } from "../services/movieServices";
import { setMovieList } from "../slices/movieSlice";
import classes from "./PreviewPage.module.css";

const PreviewPage = () => {
    const dispatch = useDispatch();
    const [searchField, setSearchField] = useState("");
    const [rawInput, setRawInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const movieList = useSelector((state) => state.movies.movieList);
    const genres = useSelector((state) => state.movies.genres);
    const finalMovieList = useMemo(() => {
        if (selectedGenre) {
            return movieList.filter((movie) =>
                movie.movieDetails.genre_ids.includes(+selectedGenre)
            );
        } else {
            return movieList;
        }
    }, [movieList, selectedGenre]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchField.trim() === "") {
                setSearchResults([]);
                return;
            }

            try {
                const data = await getMovie(searchField);
                setSearchResults(data.results);
            } catch (error) {
                if (error.name !== "CanceledError") {
                    console.error("Search failed:", error);
                }
            }
        };

        setSearchField(rawInput);
        const handler = setTimeout(() => {
            fetchSearchResults();
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [rawInput, searchField]);

    const inputChangeHandler = (event) => {
        setSearchResults([]);
        setRawInput(event.target.value);
    };

    const onSaveHandler = async () => {
        const selectedMovies = movieList
            .filter((movie) => movie.movieDetails)
            .map((movie) => ({
                ...movie.movieDetails,
            }));
        console.log(selectedMovies);

        try {
            await saveMovies(selectedMovies);
            console.log("Movies saved successfully!");
        } catch (error) {
            console.log("Movies failed to save.", error);
        }
    };

    const addToListHandler = (movie) => {
        const selectedMovie = {
            title: movie.title,
            isChecked: true,
            movieDetails: movie,
        };
        dispatch(setMovieList([...movieList, selectedMovie]));
        setSearchResults([]);
        setRawInput("");
    };

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    console.log(finalMovieList);

    return (
        <div className={classes.previewPage}>
            <h1>Search Results</h1>
            <div>
                <form
                    className={`${classes.searchForm} ${
                        searchResults.length > 0 ? classes.searchFormActive : ""
                    }`}
                >
                    <SearchIcon />
                    <input
                        type="text"
                        placeholder="Search additional movies"
                        autoComplete="off"
                        value={searchField}
                        onChange={inputChangeHandler}
                    />
                    {searchResults.length > 0 && (
                        <div className={classes.searchSuggestions}>
                            {searchResults.map((movie) => (
                                <div
                                    key={movie.id}
                                    onClick={() => addToListHandler(movie)}
                                >
                                    {movie.title}
                                    {movie.release_date &&
                                        ` - ${
                                            movie.release_date.split("-")[0]
                                        }`}
                                </div>
                            ))}
                        </div>
                    )}
                </form>
            </div>
            <div className={classes.genreSelectContainer}>
                <label className={classes.genreSelect} htmlFor="genre">
                    Choose a genre:
                </label>
                <select
                    id="genre"
                    value={selectedGenre}
                    onChange={handleGenreChange}
                >
                    <option value="">-- Select Genre --</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className={classes.moviesContainer}>
                {finalMovieList.map((movie, index) => {
                    return (
                        <MovieCard
                            key={movie.movieDetails.id}
                            movieDetails={movie.movieDetails}
                            movieIndex={index}
                        />
                    );
                })}
            </div>

            {finalMovieList.length !== 0 && (
                <Button onClickFn={onSaveHandler}>Save</Button>
            )}
        </div>
    );
};

export default PreviewPage;
