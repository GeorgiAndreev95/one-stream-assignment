import { useEffect } from "react";

import { getGenres } from "../services/movieServices";
import { setGenres } from "../slices/movieSlice";
import { useDispatch, useSelector } from "react-redux";

const useCheckGenres = () => {
    const language = useSelector((state) => state.movies.language);
    const genres = useSelector((state) => state.movies.genres);
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchData() {
            const genres = await getGenres();
            dispatch(setGenres(genres));
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            const genres = await getGenres();
            dispatch(setGenres(genres));
        }
        if (genres.length > 0) {
            fetchData();
        }
    }, [language]);
};

export default useCheckGenres;
