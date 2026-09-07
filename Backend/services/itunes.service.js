// Helper functions for talking to Apple's iTunes Search API.
// https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html

// Whitelist of media types accepted by the iTunes Search API.
// Used by appleSearchMiddleware to validate the "media" query parameter.
const mediaValues = [
  "movie",
  "podcast",
  "music",
  "musicVideo",
  "audiobook",
  "shortFilm",
  "tvShow",
  "software",
  "ebook",
  "all",
];

const buildSearchUrl = (term, media, limit) => {
  // Setting up our query parameters (URLSearchParams handles the encoding)
  const params = new URLSearchParams({
    term,
    country: "US",
    media,
    limit: String(limit),
  });
  // if the media type selected by the user is equal to music we append additional information to the existing search url
  if (media === "music") {
    params.set("entity", "album");
  }
  // we then return the fully-qualified iTunes Search API URL
  return `https://itunes.apple.com/search?${params.toString()}`;
};

// Apple returns a small 100x100 artwork; we swap it for 600x600.
const enlargeArtwork = (url) => {
  if (!url) return null;
  return url.replace("100x100", "600x600");
};

// Our transfomr result function returns details conditionally, with fallback values where no details exist
const transformResult = (item) => ({
  id: item.trackId ?? item.collectionId ?? item.artistId ?? null,
  name: item.trackName ?? item.collectionName ?? item.artistName ?? "Unknown",
  artist: item.artistName ?? "Unknown artist",
  artworkUrl: enlargeArtwork(item.artworkUrl100),
  releaseDate: item.releaseDate ?? null,
  kind: item.kind ?? null,
  genre: item.primaryGenreName ?? null,
  link: item.collectionViewUrl ?? item.trackViewUrl ?? null,
});

// Exporting our helper functions
module.exports = { mediaValues, buildSearchUrl, transformResult };
