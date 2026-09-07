// Importing dependencies
const {
  appleSearchController,
} = require("../controllers/appleSearch.controller.js");
const {
  appleSearchMiddleware,
} = require("../middleware/appleSearch.middleware.js");
const { authenticate } = require("../middleware/auth.middleware.js");

// This route is protected by a JWT (authenticate) and validates the
// user's input before running the controller.
const appleSearchRoute = (app) => {
  app.get(
    "/api/search",
    authenticate,
    appleSearchMiddleware,
    appleSearchController,
  );
};

// Exporting the route so it can be registered in server.js
module.exports = appleSearchRoute;
