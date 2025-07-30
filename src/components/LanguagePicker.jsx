import { useDispatch, useSelector } from "react-redux";

import { setResultLanguage } from "../slices/movieSlice";
import classes from "./LanguagePicker.module.css";

const LanguagePicker = () => {
    const dispatch = useDispatch();
    const selectedLanguage = useSelector((state) => state.movies.language);

    console.log(selectedLanguage);
    const onEnglishHandler = () => {
        if (selectedLanguage === "en-US") {
            return;
        }
        dispatch(setResultLanguage("en-US"));
    };

    const onBulgarianHandler = () => {
        if (selectedLanguage === "bg-BG") {
            return;
        }
        dispatch(setResultLanguage("bg-BG"));
    };

    const onGermanHandler = () => {
        if (selectedLanguage === "de-DE") {
            return;
        }
        dispatch(setResultLanguage("de-DE"));
    };

    return (
        <div className={classes.chooseLanguageContainer}>
            <h3>Choose Language:</h3>
            <button
                className={`${classes.languageButton} ${
                    selectedLanguage === "en-US"
                        ? classes.languageButtonActive
                        : ""
                }`}
                onClick={onEnglishHandler}
            >
                English (default)
            </button>
            <button
                className={`${classes.languageButton} ${
                    selectedLanguage === "de-DE"
                        ? classes.languageButtonActive
                        : ""
                }`}
                onClick={onGermanHandler}
            >
                German
            </button>
            <button
                className={`${classes.languageButton} ${
                    selectedLanguage === "bg-BG"
                        ? classes.languageButtonActive
                        : ""
                }`}
                onClick={onBulgarianHandler}
            >
                Bulgarian
            </button>
        </div>
    );
};

export default LanguagePicker;
