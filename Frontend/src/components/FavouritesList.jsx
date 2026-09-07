// Importing dependencies
import { Row, Col, Card, Button } from "react-bootstrap";

const FavouritesList = ({ favourites, onRemove }) => (
  /* In this functional component we implicitly return the JSX by using () as opposed to {} */
  <section className="mt-5">
    <h2>My Favourites</h2>
    {/* If the length of our favoyurites array is equal to zero we return a "No Favourties Yet" message */}
    {favourites.length === 0 ? (
      <p className="text-muted">
        No favourites yet. Click &quot;Add to favourites&quot; on a result to
        save it here.
      </p>
    ) : (
      <Row xs={1} sm={2} md={3} className="g-3">
        {/* Else we map over the favourites array and return each favourite with a remove button */}
        {favourites.map((item) => (
          <Col key={item.id}>
            <Card className="h-100">
              <Row className="g-0 align-items-center">
                <Col xs={4}>
                  <Card.Img
                    src={item.artworkUrl}
                    alt={`${item.name} artwork`}
                  />
                </Col>
                <Col xs={8}>
                  <Card.Body>
                    <Card.Title className="fs-6">{item.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted fs-6">
                      {item.artist}
                    </Card.Subtitle>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onRemove(item.id)}
                    >
                      Remove
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    )}
  </section>
);

// Exporting the functional component
export default FavouritesList;
