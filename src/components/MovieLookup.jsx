import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./MovieLookup.module.css";
import PreviewPage from "./PreviewPage";
import { getMovie } from "../services/movieServices";
import { setMovieList } from "../slices/movieSlice";
import CloudIcon from "../assets/cloud.svg?react";
import Button from "./Button";
import LanguagePicker from "./LanguagePicker";

const MovieLookup = () => {
    const dispatch = useDispatch();
    const movieList = useSelector((state) => state.movies.movieList);
    const genres = useSelector((state) => state.movies.genres);

    const hasDetals = useMemo(() => {
        return movieList.some((movie) => movie.movieDetails);
    }, [movieList]);

    const fileChangeHandler = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (event) => {
            const text = event.target.result;

            const movieArray = text
                .split(/\r?\n/)
                .filter((line) => line.length > 0)
                .map((line) => {
                    return { title: line.trim(), isChecked: true };
                });

            dispatch(setMovieList(movieArray));
        };
        reader.onerror = (event) => {
            console.log("Error reading the file. Please try again.", event);
        };

        reader.readAsText(file);
    };

    const handleCheckboxChange = (movie) => {
        const updatedMovieList = movieList.map((element) => {
            if (element.title === movie.title) {
                return { ...element, isChecked: !movie.isChecked };
            }
            return element;
        });

        dispatch(setMovieList(updatedMovieList));
    };

    const onSearchHandler = async (event) => {
        event.preventDefault();

        const detailedMovieList = await Promise.all(
            movieList.map(async (movie) => {
                if (movie.isChecked) {
                    try {
                        const movieResult = await getMovie(movie.title);
                        // console.log(movieResult.results[0]);
                        return {
                            ...movie,
                            movieDetails: movieResult.results[0],
                        };
                    } catch (error) {
                        console.error(`Error fetching ${movie.title}:`, error);
                        return {
                            ...movie,
                            movieDetails: null,
                        };
                    }
                }
                return movie;
            })
        );

        const detailedMovieListWithGenre = detailedMovieList.map((movie) => {
            const genresToAdd = movie.movieDetails.genre_ids.map((id) => {
                const genreToAdd = genres.find((element) => element.id === id);
                return genreToAdd.name;
            });
            return {
                ...movie,
                movieDetails: { ...movie.movieDetails, genres: genresToAdd },
            };
        });
        console.log(detailedMovieListWithGenre);

        dispatch(setMovieList(detailedMovieListWithGenre));
    };

    return (
        <>
            {!hasDetals ? (
                <>
                    <h1 className={classes.pageTitle}>
                        Upload Your Movie List
                    </h1>
                    <div className={classes.inputWrapper}>
                        {movieList.length === 0 ? (
                            <>
                                <form
                                    className={classes.input}
                                    onClick={() => {
                                        document
                                            .querySelector(".inputField")
                                            .click();
                                    }}
                                >
                                    <CloudIcon className={classes.cloudIcon} />
                                    <p>Click to Upload File</p>
                                    <input
                                        className="inputField"
                                        type="file"
                                        accept=".txt"
                                        onChange={fileChangeHandler}
                                        hidden
                                    />
                                </form>
                            </>
                        ) : (
                            <>
                                <div className={classes.movieTitleContainer}>
                                    {movieList.map((movie, index) => (
                                        <div
                                            className={classes.movieTitle}
                                            key={index}
                                            onClick={() =>
                                                handleCheckboxChange(movie)
                                            }
                                        >
                                            <input
                                                type="checkbox"
                                                checked={movie.isChecked}
                                                readOnly
                                            />
                                            <p>{movie.title}</p>
                                        </div>
                                    ))}
                                </div>
                                <LanguagePicker />
                                <Button onClickFn={onSearchHandler}>
                                    Search
                                </Button>
                            </>
                        )}
                    </div>
                </>
            ) : (
                <PreviewPage />
            )}
        </>
    );
};

export default MovieLookup;
