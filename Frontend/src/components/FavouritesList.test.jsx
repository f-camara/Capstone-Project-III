// Importing dependencies
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FavouritesList from "./FavouritesList.jsx";

// Testing the FavouritesList component
describe("FavouritesList", () => {
  // When there are no favourites, a message should be shown
  it("shows a message when there are no favourites", () => {
    render(<FavouritesList favourites={[]} onRemove={() => {}} />);
    expect(screen.getByText(/no favourites yet/i)).toBeInTheDocument();
  });

  // Favourites should render, and clicking remove should call onRemove
  it("renders favourites and calls onRemove when removing", async () => {
    const user = userEvent.setup();
    // Creating a mock function so we can check what it was called with
    const onRemove = vi.fn();
    // A sample favourites array to render
    const favourites = [
      {
        id: 1,
        name: "Album",
        artist: "Artist",
        artworkUrl: "https://example.com/a.jpg",
      },
    ];

    render(<FavouritesList favourites={favourites} onRemove={onRemove} />);
    expect(screen.getByText("Album")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /remove/i }));
    expect(onRemove).toHaveBeenCalledWith(1);
  });
});