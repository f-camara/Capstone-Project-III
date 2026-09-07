// Importing dependenices
import { useState } from "react";
import { Container } from "react-bootstrap";
import SearchBar from "./components/SearchBar.jsx";
import ResultsGrid from "./components/ResultsGrid.jsx";
import FavouritesList from "./components/FavouritesList.jsx";

/**
 * Top-level component: owns all application state and coordinates the
 * search and favourites features.
 */

const App = () => {
  // State declarations & initialisation
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);

  // Function: Handle Search
  const handleSearch = async (term, media) => {
    // Setting loading state to true (so that bootstrap loading spinner can display on front end durind API execution)
    setLoading(true);
    // Resetting any previous error message before a new search
    setError(null);

    try {
      // Getting an authorisation token from the backend and storing it to "tokenResponse"
      const tokenResponse = await fetch("/api/token", { method: "POST" });
      // If "tokenResponse" is not okay, we throw an error
      if (!tokenResponse.ok) {
        throw new Error("Failed to obtain an authorisation token");
      }
      // else if tokenResponse is okay we parse it and store it to a variable called "token"
      const { token } = await tokenResponse.json();

      // Converting user input into a list of pairs
      const params = new URLSearchParams({ term, media });

      // Sending a get request to the server
      const response = await fetch(`/api/search?${params.toString()}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      // If "response" is not okay, we throw an error
      if (!response.ok) {
        throw new Error("Search failed");
      }
      // Else we parse response and store it to data variable
      const data = await response.json();
      // Storing the results to our setResults state
      setResults(data.results || []);
      // Set loading state to false to change front-end display
      setLoading(false);
    } catch (err) {
      // The catch block runs if the try block threw an error
      // Storing the error message so it can be displayed to the user
      setError(err.message || "Something went wrong");
      // Set loading state to false to change front-end display
      setLoading(false);
    }
  };

  // Function: Is Favourite
  // Checks whether an item (by id) is already in the favourites list
  const isFavourite = (id) => favourites.some((item) => item.id === id);

  // Function: Toggle Favorite
  const toggleFavourite = (item) => {
    setFavourites((prev) =>
      // If the item is already favourited we remove it, otherwise we add it
      prev.some((fav) => fav.id === item.id)
        ? prev.filter((fav) => fav.id !== item.id)
        : [...prev, item],
    );
  };

  // Function: Remove Favourite
  const removeFavourite = (id) => {
    // Filtering out the favourite whose id matches the one being removed
    setFavourites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Container className="py-4">
      <h1 className="text-center mb-2">iTunes Search App</h1>
      <p className="text-center text-muted mb-4">
        Front-end i'm flawless ...
        <br />
        I understand the backend signal flow real clearly, but definitely need
        more rehearsal
        <br />
        to solidify these concepts and gain just . . . confidence
      </p>

      {/* Search Bar Component */}
      <SearchBar onSearch={handleSearch} />

      {/* Results Grid Component */}
      <ResultsGrid
        results={results}
        loading={loading}
        error={error}
        isFavourite={isFavourite}
        onToggle={toggleFavourite}
      />

      {/* Favourites List Component */}
      <FavouritesList favourites={favourites} onRemove={removeFavourite} />
    </Container>
  );
};

// Exporting the App component
export default App;
