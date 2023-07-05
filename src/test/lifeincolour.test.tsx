import { render, screen, fireEvent } from "@testing-library/react";
import Grid from "../app/life-in-colour/page"; // Replace this with the actual path to your Grid component

describe("Grid", () => {
  it("renders the header correctly", () => {
    render(<Grid />);
    const headerElement = screen.getByText(/My Life in Colour/i);
    expect(headerElement).toBeInTheDocument();
  });

  it("renders the correct number of divs", () => {
    render(<Grid />);
    const divElements = screen.queryAllByTestId("myDiv");
    expect(divElements.length).toBe(365);
  });

  it("opens the modal when a day is clicked", () => {
    render(<Grid />);
    const gridDay = screen.getByTestId("myDiv");
    fireEvent.click(gridDay);
    // Assuming the Entry component renders an element with "Entry" text.
    const entryElement = screen.getByText(/Good/i);
    expect(entryElement).toBeInTheDocument();
  });
});
