// Importing dependencies
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ResultCard from "./ResultCard.jsx";

// A sample item to pass into our component in the tests
const item = {
  id: 123,
  name: "In Between Dreams",
  artist: "Jack Johnson",
  artworkUrl: "https://example.com/artwork.jpg",
  releaseDate: "2005-03-01T00:00:00Z",
  genre: "Rock",
  link: "https://example.com/view",
};

// Testing the ResultCard component
describe("ResultCard", () => {
  // The card should render the item's name, artist and release date
  it("renders the item's name, artist and release date", () => {
    render(<ResultCard item={item} isFavourite={false} onToggle={() => {}} />);
    expect(screen.getByText("In Between Dreams")).toBeInTheDocument();
    expect(screen.getByText("Jack Johnson")).toBeInTheDocument();
    expect(screen.getByText(/released:/i)).toBeInTheDocument();
  });

  // Clicking the favourite button should call onToggle with the item
  it("calls onToggle when the favourite button is clicked", async () => {
    const user = userEvent.setup();
    // Creating a mock function so we can check what it was called with
    const onToggle = vi.fn();
    render(<ResultCard item={item} isFavourite={false} onToggle={onToggle} />);

    await user.click(screen.getByRole("button", { name: /add to favourites/i }));

    expect(onToggle).toHaveBeenCalledWith(item);
  });
});