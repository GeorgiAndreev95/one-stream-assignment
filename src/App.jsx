import "./App.css";
import MovieLookup from "./components/MovieLookup";
import useCheckGenres from "./hooks/useCheckGenres";

function App() {
    useCheckGenres();

    return (
        <>
            <MovieLookup />
        </>
    );
}

export default App;
