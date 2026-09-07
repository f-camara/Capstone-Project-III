// Importing Dependencies
import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

// Labels and values for our form "Select" dropdown
const mediaOptions = [
  { label: "All", value: "all" },
  { label: "Movie", value: "movie" },
  { label: "Podcast", value: "podcast" },
  { label: "Music", value: "music" },
  { label: "Music video", value: "musicVideo" },
  { label: "Audiobook", value: "audiobook" },
  { label: "Short film", value: "shortFilm" },
  { label: "TV show", value: "tvShow" },
  { label: "Software", value: "software" },
  { label: "Ebook", value: "ebook" },
];

// Functional component with destructured props
const SearchBar = ({ onSearch }) => {
  // State declarations and initialisation
  const [term, setTerm] = useState("");
  const [media, setMedia] = useState("all");

  // When our user submits the form, we:
  const handleSubmit = (event) => {
    // [1] Prevent the default page reload
    event.preventDefault();

    // [2] If no search term exists:
    if (!term.trim()) {
      // [2.1] the application silently fails
      console.log(`Error: User must enter a search term`);
      // [2.2] We initiate a return so that the code stops executing
      return;
    }

    // [3] If the previous evaluation passes, we call the "onSearch" function with the
    // [3] sanitised term and media type as arguments
    onSearch(term.trim(), media);
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Row className="g-2 align-items-end">
        <Col xs={12} md={6}>
          <Form.Group controlId="search-term">
            <Form.Label>Search term</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Jack Johnson"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
            />
          </Form.Group>
        </Col>
        <Col xs={12} md={4}>
          <Form.Group controlId="media-type">
            <Form.Label>Media type</Form.Label>
            <Form.Select
              value={media}
              onChange={(event) => setMedia(event.target.value)}
            >
              {/* Mapping through the media options to display each of them on the front page */}
              {mediaOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs={12} md={2}>
          <Button type="submit" variant="primary" className="w-100">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

// Exporting our functional component
export default SearchBar;
