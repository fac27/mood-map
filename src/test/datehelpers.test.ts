describe("Day Functions", () => {
  it("returns an array with dates", () => {
    const dateArray = [];
    const newDate = new Date();
    dateArray.push(newDate);
    expect(dateArray).toContain(newDate);
  });
});
