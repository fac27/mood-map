const paths = ["/", "/detail", "/life-in-color", "/mood"];
const url = "https://mood-map.vercel.app";

paths.forEach((path) => {
  describe(`Test ${path} route redirects to login if no valid session`, () => {
    it("should redirect to login if no session", () => {
      cy.visit(url + path);
      cy.url().should("eq", url + "/login"); // check redirect
    });
    it("should not redirect but should instead show email", () => {
      cy.visit(url + "/mood");
      cy.get("#email").type("tom@team-freeman.com");
      cy.get("#password").type("password");
      cy.get("#auth-sign-in").click();
      cy.visit(url + path);
      cy.url()
        .should("eq", url + "/login")
        .not(); // check redirect
    });
  });
});
