// Importing dependencies
const express = require("express");
const cors = require("cors");

// Loading our environment variables from the .env file
require("dotenv").config();

// Importing our route files
const appleSearchRoute = require("./routes/appleSearch.route.js");
const tokenRoute = require("./routes/token.route.js");

// Creating an instance of the Express app
const app = express();

// Allowing the React dev server (Vite) to call this API during development
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Telling Express to parse incoming JSON request bodies
app.use(express.json());

// Registering our API routes
appleSearchRoute(app);
tokenRoute(app);

// Root route: lets us check the server is running by visiting "/"
app.get("/", (req, res) => {
  res.json({ message: "iTunes Search API is running" });
});

// 404 handler for any request that reaches this point matched no route
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Port to listen on (defaults to 8080 if not set in .env)
const port = process.env.PORT || 8080;

// Only start listening when run directly (this prevents tests from starting the server)
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

// Exporting the app so tests can import it
module.exports = app;
