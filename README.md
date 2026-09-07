# iTunes Search Web Application

A full-stack web application that lets users search the iTunes Store and
save their favourite items. Built as a school capstone project.

## Purpose

The app demonstrates a complete client-server architecture:

- A **React** front end with a responsive, mobile-friendly Bootstrap UI.
- A **Node.js/Express** back end that proxies requests to Apple's iTunes
  Search API and secures its routes with JSON Web Tokens (JWT).

## Featues

- Search the iTunes Store by term and media type (movie, podcast, music,
  audiobook, short film, TV show, software, ebook, or all).
- Results show album/title, artist, cover image, release date and genre.
- Add and remove items from an in-memory favourites list.
- API routes are protected with JWT authorisation.
- Fully responsive layout using Bootstrap.

## Installation

1. Install back-end dependencies:

   ```bash
   cd Backend
   npm install
   ```

2. Install front-end dependencies:

   ```bash
   cd ../Frontend
   npm install
   ```

3. Configure environment variables in `Backend/.env` (see `Backend/.env.example`):

   ```
   PORT=8080
   JWT_SECRET=<your-secret-here>
   ```

## Running the Application Locally

1. Start the back end (from the `Backend` folder):

   ```bash
   nodemon server
   ```

   The server listens on `http://localhost:8080`.

2. In a second terminal, start the front end (from the `Frontend` folder):

   ```bash
   npm run dev
   ```

   Open `http://localhost:5173` in your browser. The Vite dev server
   proxies `/api` requests to the back end automatically.

## Running Tests

Back end:

```bash
cd Backend
npm test
```

Front end:

```bash
cd Frontend
npm test
```

## References

- [iTunes Search API documentation (Apple)](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html)

## Author

Flavio Camara • Built as a school capstone project.
