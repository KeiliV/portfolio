import KanbanPage from "../pages/kanban";

describe("Issue details editing", () => {
  beforeEach(() => {
    const page = new KanbanPage();
    page.visit("/");
    cy.wrap(page).as("page");
  });

  const newIssueDetails = {
    title: "This is an issue of type: Task.",
    newType: '[data-testid="icon:bug"]',
    newStatus: '[data-testid="select-option:In progress"]',
    newReporter: '[data-testid="select-option:Lord Gaben"]',
    newPriority: '[data-testid="select-option:Medium"]',
  };

  it("Should update issue status and move it to corresponding issue list successfully", function () {
    const issueModal = this.page.clickIssueCard(
      "This is an issue of type: Task."
    );
    issueModal.changeIssueStatus(newIssueDetails);
    issueModal.closeIssueModal();
    cy.log("Validations:");
    this.page.validateIssueExistsInInProgress(newIssueDetails.title);
  });
});
