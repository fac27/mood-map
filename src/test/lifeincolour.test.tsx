import { render, screen, fireEvent } from "@testing-library/react";
import Grid from "../app/life-in-colour/page";

jest.mock("next/router", () => ({
  useRouter: () => ({
    route: "/test",
    pathname: "/test",
    query: "",
    asPath: "",
    replace: jest.fn(),
    push: jest.fn(),
  }),
}));

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

  it("opens the modal when a day is clicked", async () => {
    render(<Grid />);
    const gridDays = screen.queryAllByTestId("myDiv");
    fireEvent.click(gridDays[0]);
    const entryElement = await screen.findByText(/Good/i);
    expect(entryElement).toBeInTheDocument();
  });
});
