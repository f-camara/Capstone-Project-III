// Importing dependencies
import { Card, Button } from "react-bootstrap";

// Auxilllary function aids in fromating the release date
const formatDate = (releaseDate) => {
  // If there is no release date, return null
  if (!releaseDate) return null;
  // Else we convert the release date into a date object and store it to the "date" variable
  const date = new Date(releaseDate);
  // we then return the date string that exists in the date object with "toLocaleDateString"
  return date.toLocaleDateString();
};

// Functional component with destructured props
const ResultCard = ({ item, isFavourite, onToggle }) => {
  // Calling the auxillary function with the release date argument and storing it to a "releaseDate" variable
  const releaseDate = formatDate(item.releaseDate);

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={item.artworkUrl}
        alt={`${item.name} artwork`}
        style={{ height: "220px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6">{item.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{item.artist}</Card.Subtitle>
        {/* If release date exists/truthy, we display the release date section, else it remains hidden */}
        {releaseDate && (
          <Card.Text className="mb-1">Released: {releaseDate}</Card.Text>
        )}
        {/* If genre exists/truthy, we display the genre section, else it remains hidden */}
        {item.genre && (
          <Card.Text className="mb-2 text-muted">Genre: {item.genre}</Card.Text>
        )}
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <Button
            // Conditional style rendering on bootstrap button
            variant={isFavourite ? "danger" : "outline-primary"}
            size="sm"
            onClick={() => onToggle(item)}
          >
            {/* Conditional button text determined by "isFavourite" state */}
            {isFavourite ? "Remove favourite" : "Add to favourites"}
          </Button>
          {/* If item link exists/truthy, we display the item link section, else it remains hidden */}
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="small"
            >
              View on iTunes
            </a>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

// Exporting the functional component
export default ResultCard;
