import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { removeMovie, setMovieList } from "../slices/movieSlice";
import TrashIcon from "../assets/trash-bin.svg?react";
import UpIcon from "../assets/arrow-up.svg?react";
import DownIcon from "../assets/arrow-down.svg?react";
import classes from "./MovieCard.module.css";

const MovieCard = ({
    movieDetails,
    movieIndex,
    filteredMovies,
    selectedGenre,
}) => {
    const {
        id,
        backdrop_path,
        poster_path,
        title,
        overview,
        vote_average,
        release_date,
        genres,
    } = movieDetails;
    const dispatch = useDispatch();
    const movieList = useSelector((state) => state.movies.movieList);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedOverview, setEditedOverview] = useState(overview);

    const formattedDate = new Date(release_date).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const handleDelete = () => {
        dispatch(removeMovie(id));
    };

    const handleMoveUp = () => {
        const updatedMovieList = [...movieList];

        if (movieIndex === 0) {
            return;
        }
        const [movedItem] = updatedMovieList.splice(movieIndex, 1);
        updatedMovieList.splice(movieIndex - 1, 0, movedItem);

        dispatch(setMovieList(updatedMovieList));
    };

    const handleMoveDown = () => {
        const updatedMovieList = [...movieList];

        if (movieIndex === movieList.length - 1) {
            return;
        }
        const [movedItem] = updatedMovieList.splice(movieIndex, 1);
        updatedMovieList.splice(movieIndex + 1, 0, movedItem);

        dispatch(setMovieList(updatedMovieList));
    };

    const handleEditContent = () => {
        if (isEditing) {
            if (editedTitle !== title || editedOverview !== overview) {
                const editedMovieList = movieList.map((movie) => {
                    if (movie.movieDetails.id === id) {
                        return {
                            ...movie,
                            movieDetails: {
                                ...movieDetails,
                                title: editedTitle,
                                overview: editedOverview,
                            },
                        };
                    } else {
                        return movie;
                    }
                });
                dispatch(setMovieList(editedMovieList));
            }
        }
        setIsEditing((prev) => !prev);
    };

    const onTitleChangeHandler = (event) => {
        setEditedTitle(event.target.value);
    };

    const onOverviewChangeHandler = (event) => {
        setEditedOverview(event.target.value);
    };

    return (
        <div className={classes.movieCardContainer}>
            {!selectedGenre && (
                <div className={classes.orderButtons}>
                    <button
                        className={classes.orderButton}
                        onClick={handleMoveUp}
                        disabled={movieIndex === 0}
                    >
                        <UpIcon className={classes.orderButtonIcon} />
                    </button>
                    <button
                        className={classes.orderButton}
                        onClick={handleMoveDown}
                        disabled={movieIndex === filteredMovies.length - 1}
                    >
                        <DownIcon className={classes.orderButtonIcon} />
                    </button>
                </div>
            )}
            <div
                className={classes.movieContainer}
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className={classes.imgContainer}>
                    <img
                        src={`https://image.tmdb.org/t/p/original${poster_path}`}
                    />
                </div>
                <div className={classes.movieDetails}>
                    <div>
                        <div className={classes.titleBox}>
                            {isEditing ? (
                                <input
                                    className={classes.editingTitle}
                                    type="text"
                                    placeholder={title}
                                    value={editedTitle}
                                    onChange={onTitleChangeHandler}
                                />
                            ) : (
                                <h1>
                                    {editedTitle !== title
                                        ? editedTitle
                                        : title}
                                </h1>
                            )}
                            <button onClick={handleEditContent}>
                                {isEditing ? "Finish Editing" : "Edit Content"}
                            </button>
                        </div>

                        <p className={classes.releaseDate}>
                            Release Date: {formattedDate}
                        </p>
                        {isEditing ? (
                            <textarea
                                className={classes.editingOverview}
                                placeholder={overview}
                                value={editedOverview}
                                onChange={onOverviewChangeHandler}
                            />
                        ) : (
                            <p>{overview}</p>
                        )}
                        <div className={classes.genres}>
                            {genres.map((genre) => (
                                <p key={genre}>{genre}</p>
                            ))}
                        </div>
                    </div>
                    <div className={classes.bottomDetails}>
                        <p>Rating: {vote_average.toFixed(1)}/10</p>
                        <div onClick={handleDelete}>
                            <TrashIcon className={classes.icon} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
