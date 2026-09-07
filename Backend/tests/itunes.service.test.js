// Importing dependencies
import { describe, it, expect } from "vitest";
import {
  mediaValues,
  buildSearchUrl,
  transformResult,
} from "../services/itunes.service.js";

// Testing the mediaValues variable
describe("mediaValues", () => {
  // Checking that our whitelist contains the media types we rely on
  it("contains the media types supported by the iTunes API", () => {
    expect(mediaValues).toContain("music");
    expect(mediaValues).toContain("shortFilm");
    expect(mediaValues).toContain("tvShow");
    expect(mediaValues).toContain("all");
  });
});

// Testing the buildSearchUrl helper function
describe("buildSearchUrl", () => {
  // A basic URL should contain the term, media and limit parameters
  it("builds a URL with term, media and limit", () => {
    const url = buildSearchUrl("jack johnson", "music", 25);
    expect(url).toContain("https://itunes.apple.com/search");
    expect(url).toContain("term=jack+johnson");
    expect(url).toContain("media=music");
    expect(url).toContain("limit=25");
  });

  // Music searches should request the "album" entity
  it("adds the album entity for music searches", () => {
    const url = buildSearchUrl("jack johnson", "music", 25);
    expect(url).toContain("entity=album");
  });

  // Non-music searches should not add an entity
  it("does not add an entity for non-music searches", () => {
    const url = buildSearchUrl("inception", "movie", 10);
    expect(url).not.toContain("entity=");
  });
});

// Testing the transformResult helper function
describe("transformResult", () => {
  // An album result should map cleanly to our frontend item
  it("maps an album result to the frontend item", () => {
    // A sample raw iTunes album result
    const raw = {
      collectionId: 123,
      collectionName: "In Between Dreams",
      artistName: "Jack Johnson",
      artworkUrl100: "https://example.com/100x100bb.jpg",
      releaseDate: "2005-03-01T08:00:00Z",
      kind: "album",
      primaryGenreName: "Rock",
      collectionViewUrl: "https://example.com/view",
    };

    // Checking that every field is mapped correctly
    expect(transformResult(raw)).toEqual({
      id: 123,
      name: "In Between Dreams",
      artist: "Jack Johnson",
      artworkUrl: "https://example.com/600x600bb.jpg",
      releaseDate: "2005-03-01T08:00:00Z",
      kind: "album",
      genre: "Rock",
      link: "https://example.com/view",
    });
  });

  // Non-album results should fall back to the track fields
  it("falls back to track fields for non-album results", () => {
    // A sample raw iTunes track result
    const raw = {
      trackId: 99,
      trackName: "A Song",
      artistName: "An Artist",
      artworkUrl100: "https://example.com/100x100bb.jpg",
      releaseDate: "2020-01-01T00:00:00Z",
      kind: "song",
      trackViewUrl: "https://example.com/track",
    };

    const result = transformResult(raw);
    expect(result.id).toBe(99);
    expect(result.name).toBe("A Song");
    expect(result.link).toBe("https://example.com/track");
  });

  // A track that belongs to an album has a trackId AND a collectionId.
  it("uses trackId for tracks that also have a collectionId", () => {
    // A sample raw iTunes track result (part of an album)
    const raw = {
      trackId: 100,
      collectionId: 200,
      trackName: "A Song",
      collectionName: "The Album",
      artistName: "An Artist",
      artworkUrl100: "https://example.com/100x100bb.jpg",
    };

    const result = transformResult(raw);
    // trackId wins, not the shared collectionId
    expect(result.id).toBe(100);
    // track name wins, not the shared album name
    expect(result.name).toBe("A Song");
  });
});
