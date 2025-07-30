import { useDispatch, useSelector } from "react-redux";

import { removeMovie, setMovieList } from "../slices/movieSlice";
import TrashIcon from "../assets/trash-bin.svg?react";
import UpIcon from "../assets/arrow-up.svg?react";
import DownIcon from "../assets/arrow-down.svg?react";
import classes from "./MovieCard.module.css";

const MovieCard = ({ movieDetails, movieIndex }) => {
    const dispatch = useDispatch();
    const movieList = useSelector((state) => state.movies.movieList);

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

    return (
        <div className={classes.movieCardContainer}>
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
                    disabled={movieIndex === movieList.length - 1}
                >
                    <DownIcon className={classes.orderButtonIcon} />
                </button>
            </div>
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
                        <h1>{title}</h1>

                        <p className={classes.releaseDate}>
                            Release Date: {formattedDate}
                        </p>
                        <p>{overview}</p>
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
