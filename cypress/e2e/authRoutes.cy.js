// const paths = ["/", "/detail", "/life-in-color", "/mood"];
const PATHS = ["/", "/mood"];
// const url = "https://mood-map.vercel.app";
const PORT = "3000";
const URL = `http://localhost:${PORT}`;

PATHS.forEach((path) => {
  describe(`Test ${path} route redirects to login if no valid session`, () => {
    it("should redirect to login if no session", () => {
      cy.visit(URL + path);
      cy.url().should("eq", URL + "/login"); // check redirect
    });
    it("should not redirect but should instead show email", () => {
      cy.visit(URL + "/mood");
      cy.get("#email").type("tom@team-freeman.com");
      cy.get("#password").type("password");
      cy.get("#auth-sign-in").click();
      cy.visit(URL + path);
      cy.url()
        .should("eq", URL + "/login")
        .not(); // check redirect
    });
  });
});
