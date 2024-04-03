import KanbanPage from "../pages/kanban";

describe("New issue creation", () => {
  beforeEach(() => {
    const page = new KanbanPage();
    page.visit();
    const createIssueForm = page.clickCreateIssueButton();
    cy.wrap(page).as("page");
    cy.wrap(createIssueForm).as("createIssueForm");
  });

  const requiredFieldErrorMessage = "This field is required";

  const onlyRequiredIssueDetails = {
    title: "Only required fields issue title",
    description: "this is a description",
  };

  const allFiedlsFilledIssueDetails = {
    title: "Title for all fields filled issue test",
    description: "this is a description",
    assigneeSelector: '[data-testid="select-option:Pickle Rick"]',
  };

  const issueDetailsTitleWithSpaces = {
    title: "     This title has spaces",
  };

  it("Should create and issue with minimal required fields and validate it succesfully", function () {
    this.createIssueForm.createNewIssueOnlyRequiredFields(
      onlyRequiredIssueDetails
    );
    this.page.validateCreateIssueFormDoesNotExist();
    this.page.validateIssueIsVisibleOnBoard(onlyRequiredIssueDetails);
  });

  it("Should create an issue with all fields and validate it succesfully", function () {
    this.createIssueForm.createNewIssueAllFields(allFiedlsFilledIssueDetails);
    cy.log("Cypress at times does not run test if there is no cy in the test");
    this.page.validateCreateIssueFormDoesNotExist();
    this.page.validateIssueIsVisibleOnBoard(allFiedlsFilledIssueDetails);
  });

  it("Should give appropriate error message when required fields are missing", function () {
    this.createIssueForm.clearAllFieldsInCreateIssueForm();
    this.createIssueForm.submitButton().click();

    cy.log("Error validations");

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

  it.only("Should create an issue and remove extra spaces from issue title in board view", function () {
    this.createIssueForm.createNewIssueOnlyRequiredFields(
      issueDetailsTitleWithSpaces
    );
    cy.log("Validations");
    this.page.validateCreateIssueFormDoesNotExist();
    cy.contains("Issue has been successfully created.").should("be.visible");
    cy.reload();
    this.page.validateIssueExistsInBacklog(
      issueDetailsTitleWithSpaces.title.trim()
    );
  });
});
