// Importing dependencies
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    // We store and extract the entire token to "jwtToken"
    const jwtToken = req.headers["authorization"];

    // If no token exists, We:
    if (!jwtToken) {
      // [1] Return a 401 (unauthorised) error
      return res.status(401).json({ error: "Missing or invalid token" });
    }

    // We then extract a portion of the token and store it to "extractedToken"
    const extractedToken = jwtToken.split(" ")[1];

    // We then verify that this token is valid and authentic with jwt.verify
    const payload = jwt.verify(extractedToken, process.env.JWT_SECRET);

    // We then set req.payload equal to the value of the payload from the last step (our other middleware and controller will use this payload to extact information)
    req.payload = payload;

    // We pass the request over to the next middleware function
    next();
  } catch (error) {
    // If verification failed we return a 401 (unauthorised) error
    return res.status(401).json({ error: "Missing or invalid token" });
  }
};

// Exporting the middleware
module.exports = { authenticate };
