// Importing dependencies
const { tokenController } = require("../controllers/token.controller.js");

// This public route issues a JWT used to authorise requests.
const tokenRoute = (app) => {
  app.post("/api/token", tokenController);
};

// Exporting the route so it can be registered in server.js
module.exports = tokenRoute;