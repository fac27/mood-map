const PATHS: string[] = ["/", "/mood"];
const PORT = "3000";
const baseUrl = `http://localhost:${PORT}`;

PATHS.forEach((path: string) => {
  describe(`Test ${path} route redirects to login if no valid session`, () => {
    it("should redirect to login if no session", () => {
      cy.visit(baseUrl + path);
      cy.url().should("eq", baseUrl + "/login"); // check redirect
    });
    it("should not redirect but should instead show email", () => {
      cy.visit(baseUrl + "/mood");
      cy.get("#email").type("tom@team-freeman.com");
      cy.get("#password").type("password");
      cy.get("#auth-sign-in").click();
      cy.visit(baseUrl + path);
      cy.url()
        .should("eq", baseUrl + "/login")
        .not(baseUrl + "/"); // check redirect
    });
  });
});
