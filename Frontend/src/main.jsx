// Importing dependencies
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Importing Bootstrap's CSS so we can use its styling classes
import "bootstrap/dist/css/bootstrap.min.css";

// Rendering our App component into the "root" div in index.html
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
