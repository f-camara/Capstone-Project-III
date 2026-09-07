// Importing dependencies
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import request from "supertest";
import app from "../server.js";

// Helper function: request a valid token for the protected search route
const getToken = async () => {
  const response = await request(app).post("/api/token");
  return response.body.token;
};

// Testing the token route
describe("POST /api/token", () => {
  // The token endpoint should return a valid JWT string
  it("returns a token", async () => {
    const response = await request(app).post("/api/token");
    expect(response.status).toBe(200);
    expect(response.body.token).toBeTypeOf("string");
  });
});

// Testing the search route
describe("GET /api/search", () => {
  let token;
  // Getting a fresh token before each test
  beforeEach(async () => {
    token = await getToken();
  });

  // Cleaning up any mocked globals after each test to prevent tests from leaking
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  // Requests without a token should be rejected
  it("rejects requests without a token", async () => {
    const response = await request(app).get("/api/search?term=jack+johnson");
    expect(response.status).toBe(401);
  });

  // Requests with an invalid token should be rejected
  it("rejects requests with an invalid token", async () => {
    const response = await request(app)
      .get("/api/search?term=jack+johnson")
      .set("Authorization", "Bearer fake-token");
    expect(response.status).toBe(401);
  });

  // Requests without a search term should be rejected
  it("rejects requests without a search term", async () => {
    const response = await request(app)
      .get("/api/search")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  // Requests with an invalid media type should be rejected
  it("rejects an invalid media type", async () => {
    const response = await request(app)
      .get("/api/search?term=test&media=fakeMediaType")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  // A valid search should return transformed results
  it("returns transformed result for a valid search", async () => {
    // Mocking the global fetch so we don't use the real iTunes API
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          resultCount: 1,
          results: [
            {
              collectionId: 123,
              collectionName: "In Between Dreams",
              artistName: "Jack Johnson",
              artworkUrl100: "https://example.com/100x100bb.jpg",
              releaseDate: "2005-03-01T08:00:00Z",
              kind: "album",
              primaryGenreName: "Rock",
              collectionViewUrl: "https://example.com/view",
            },
          ],
        }),
      }),
    );
    // Making the reques to the API
    const response = await request(app)
      .get("/api/search?term=jack+johnson&media=music")
      .set("Authorization", `Bearer ${token}`);
    // Checking the response
    expect(response.status).toBe(200);
    expect(response.body.resultCount).toBe(1);
    expect(response.body.results[0]).toMatchObject({
      id: 123,
      name: "In Between Dreams",
      artist: "Jack Johnson",
      artworkUrl: "https://example.com/600x600bb.jpg",
    });
  });

  // When the iTunes API fails, we should return an error
  it("returns an error when the iTunes API fails", async () => {
    // Mocking fetch to simulate a failed upstream request
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 }),
    );
    // Making the reques to the API
    const response = await request(app)
      .get("/api/search?term=test")
      .set("Authorization", `Bearer ${token}`);
    // Checking the response
    expect(response.status).toBe(502);
  });
});

// Testing the 404 handler
describe("unknown routes", () => {
  // Unknown routes should return a 404 JSON response
  it("returns a 404 JSON response", async () => {
    const response = await request(app).get("/api/does-not-exist");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Not found");
  });
});
