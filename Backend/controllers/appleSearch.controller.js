// Importing dependencies
const {
  buildSearchUrl,
  transformResult,
} = require("../services/itunes.service.js");

// Function: Search the iTunes API
const appleSearchController = async (req, res, next) => {
  // Getting the validated search parameters (set by appleSearchMiddleware)
  const { term, media, limit } = req.searchParams;
  // Building the iTunes Search API URL (a string)
  const url = buildSearchUrl(term, media, limit);

  try {
    // Calling the iTunes Search API
    const response = await fetch(url);
    // If iTunes returned an error, tell the user something went wrong
    if (!response.ok) {
      return res.status(502).json({ error: "iTunes API returned an error" });
    }
    // Parsing the response and mapping each result
    const data = await response.json();
    // Mapping through each result on the data object and storing it to the results vairable
    const results = data.results.map(transformResult);
    // Sending the results back to the front end
    res.json({ resultCount: results.length, results });
  } catch (error) {
    // If our try block fails to execute, our catch block will let us know why
    return res.status(500).json({ error: `${error.message}` });
  }
};

// Exporting the controller
module.exports = { appleSearchController };
