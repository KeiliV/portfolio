import CreateNewIssue from "../pages/createNewIssueModal";

//creating an instance of the class
const createNewIssue = new CreateNewIssue();

describe("New issue creation", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        // System will already open issue creating modal in beforeEach block
        cy.visit(url + "/board?modal-issue-create=true");
      });
  });

  const issueTitleName = "Test issue title";
  const issueTitleWithSpaces = "  This is a test issue for spaces";
  const requiredFieldErrorMessage = '"This field is required"';

  const issueDetails = {
    title: issueTitleName,
    description: "this is a description",
  };

  it("Should create and issue with minimal required fields and validate it succesfully", () => {
    createNewIssue.createNewIssueOnlyRequiredFields(issueDetails);
    createNewIssue.validateNewIssueIsVisibleOnBoard(issueDetails);
  });

  it("Should create an issue with all fields and validate it succesfully", () => {
    createNewIssue.createNewIssueAllFields(issueDetails);
    createNewIssue.validateNewIssueIsVisibleOnBoard(issueDetails);
  });

  it("Should give appropriate error message when required fields are missing", () => {
    createNewIssue.getCreateIssueModal().within(() => {
      cy.get(createNewIssue.reporterId).click();
      cy.get('[data-testid="icon:close"]').click();

      cy.get(createNewIssue.issueType).click();
      cy.get('[data-testid="icon:close"]').click();

      cy.get(createNewIssue.priorityType).click();
      cy.get('[data-testid="icon:close"]').click();
      //need to click somewhere to make submit button visible
      cy.get(createNewIssue.descriptionField).click();

      cy.get(createNewIssue.submitButton).click();

      //Error Validations
      cy.get('[data-testid="form-field:type"]').contains(
        requiredFieldErrorMessage
      );
      cy.get('[data-testid="form-field:title"]').contains(
        requiredFieldErrorMessage
      );
      cy.get('[data-testid="form-field:reporterId"]').contains(
        requiredFieldErrorMessage
      );
      cy.get('[data-testid="form-field:priority"]').contains(
        requiredFieldErrorMessage
      );
    });
  });

  it("Should create an issue and remove extra spaces from issue title in board view", () => {
    createNewIssue.getCreateIssueModal().within(() => {
      cy.get(createNewIssue.title).wait(1000).type(issueTitleWithSpaces);
      cy.get(createNewIssue.submitButton).click();
    });
    cy.get(createNewIssue.createNewIssueModal).should("not.exist");
    cy.contains("Issue has been successfully created.").should("be.visible");
    cy.reload();

    cy.get(createNewIssue.backlogList).within(() => {
      cy.get(createNewIssue.issuesList).contains(issueTitleWithSpaces.trim());
    });
  });
});
