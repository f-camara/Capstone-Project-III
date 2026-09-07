// Importing dependencies
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import ResultCard from "./ResultCard.jsx";

// Functional component with destructured props
const ResultsGrid = ({ results, loading, error, isFavourite, onToggle }) => {
  // If our error state evaluates to true, we return an error to the user
  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }
  // If our loading state is true, we:
  if (loading) {
    // [1] Return a bootstrap loading animation/spinner [https://react-bootstrap.netlify.app/docs/components/spinners]
    // [1] NB: The loading state is toggled in our parent components "handleSearch" function
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading results...</p>
      </div>
    );
  }

  // If the length of the results array (results state) is equal to zero, we:
  if (results.length === 0) {
    // [1] Return a message to the user, stating that nothing has been found
    return (
      <p className="text-muted text-center my-5">
        No results found. Please try a different search term or media type.
      </p>
    );
  }

  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-3">
      {/* Mapping through our results array and displaying each result inside of a "ResultCard" child component */}
      {results.map((item) => (
        <Col key={item.id}>
          <ResultCard
            item={item}
            isFavourite={isFavourite(item.id)}
            onToggle={onToggle}
          />
        </Col>
      ))}
    </Row>
  );
};

// Exporting the functional component
export default ResultsGrid;
