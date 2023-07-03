const paths = ["/", "/detail", "/life-in-color", "/mood"];

paths.forEach((path) => {
  describe("Test every route redirects to login if no valid session", () => {
    it("should redirect to login if no session", () => {
      cy.visit(path);
      cy.url().should("eq", "/login");
    });
    it("should not redirect but should instead show email", () => {
      cy.visit("/login");
    });
  });
});

paths.forEach((path) => {
  describe("Test every route redirects to login if no valid session", () => {});
});
