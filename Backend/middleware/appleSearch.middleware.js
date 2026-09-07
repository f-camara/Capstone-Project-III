// Importing dependencies
const { mediaValues } = require("../services/itunes.service.js");

const appleSearchMiddleware = (req, res, next) => {
  // Destructuring the query parameters from the request URL
  const { term, media } = req.query;
  // if term does not exist OR term is not a string type OR term has not been sanitized, we:
  if (!term || typeof term !== "string" || !term.trim()) {
    // [1] Return an error
    return res.status(400).json({ error: "A search term is required" });
  }
  // If media exists AND its data type is string AND it has been sanitized with trim, we store it to hasMedia
  const mediaType = media && typeof media === "string" && media.trim();
  // If mediaType exists && it is not equal to anything in our mediaValues array, we:
  if (mediaType && !mediaValues.includes(media.trim())) {
    // Return an error
    return res.status(400).json({ error: "Invalid media type" });
  }
  // Storing the clean, validated parameters onto the request object.
  req.searchParams = {
    term: term.trim(),
    media: mediaType,
    limit: 50,
  };
  // Moving on to the controller
  next();
};

// Exporting the middleware
module.exports = { appleSearchMiddleware };
