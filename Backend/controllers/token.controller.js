// Importing dependencies
const jwt = require("jsonwebtoken");

// This token grants access to the protected /api/search route
const tokenController = (req, res) => {
  // Reading our secret from the environment variables (.env file)
  const secret = process.env.JWT_SECRET;
  // If secret does not exist we return an error
  if (!secret) {
    return res.status(500).json({ error: "JWT_SECRET is not set" });
  }

  // Signing a new token with the secret and an expiry time
  const token = jwt.sign({ client: "itunes-app" }, secret, {
    expiresIn: "1h",
  });

  // [2] Sending the token back to the front end
  res.json({ token });
};

// Exporting the controller
module.exports = { tokenController };
