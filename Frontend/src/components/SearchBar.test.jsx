// Importing dependencies
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar.jsx";

// Testing the SearchBar component
describe("SearchBar", () => {
  // The component should render the term input and the media select
  it("renders a term input and media select", () => {
    render(<SearchBar onSearch={() => {}} />);
    expect(screen.getByLabelText("Search term")).toBeInTheDocument();
    expect(screen.getByLabelText("Media type")).toBeInTheDocument();
  });

  // Submitting the form should call onSearch with the term and media type
  it("calls onSearch with the term and media on submit", async () => {
    const user = userEvent.setup();
    // Creating a mock function so we can check what it was called with
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    // Typing a term, selecting a media type and clicking search
    await user.type(screen.getByLabelText("Search term"), "jack johnson");
    await user.selectOptions(screen.getByLabelText("Media type"), "music");
    await user.click(screen.getByRole("button", { name: /search/i }));

    expect(onSearch).toHaveBeenCalledWith("jack johnson", "music");
  });
});