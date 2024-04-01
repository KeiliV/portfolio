describe("Authentication and verifying defult set up", () => {
  beforeEach(() => {
    cy.visit("/pro ject/board");
  });

  it("Should create guest acoount if user has no auth token and verify default amount of issues on board", () => {
    cy.window().its("localStorage.authToken").should("be.undefined");

    cy.window()
      .its("localStorage.authToken")
      .should("be.a", "string")
      .and("not.be.empty");

    //Assert total amount of issues on the board
    cy.get('[data-testid="list-issue"]').should("have.length", 8);
  });
});
