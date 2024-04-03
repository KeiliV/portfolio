import CreateIssueForm from "./components/createIssueForm";
import IssueModal from "./components/IssueModal";

const selectors = {
  createIssueButton: '[data-testid="icon:plus"]',
  backlogList: '[data-testid="board-list:backlog"]',
  newIssueForm: '[data-testid="modal:issue-create"] > form',
  issuesList: '[data-testid="list-issue"]',
  issueModal: '[data-testid="modal:issue-details"]',
  inProgressList: '[data-testid="board-list:inprogress"]',
};

export default class KanbanPage {
  constructor() {}

  visit() {
    cy.visit("/");
  }
  clickCreateIssueButton() {
    this.createIssueButton().click();

    const elem = cy.get(selectors.newIssueForm);
    return new CreateIssueForm(elem);
    // click the button, then grab the new div created by the click, then return a new instance of the CreateIssueForm
    // that has that div as its root
  }

  clickIssueCard(title) {
    cy.contains(title).click();
    return new IssueModal(cy.get(selectors.issueModal));
  }

  validateIssueIsVisibleOnBoard(issueDetails) {
    cy.contains("Issue has been successfully created.").should("be.visible");
    cy.reload();
    cy.contains(issueDetails.title).should("be.visible");
  }

  createIssueButton() {
    return cy.get(selectors.createIssueButton);
  }

  validateCreateIssueFormDoesNotExist() {
    cy.get(selectors.newIssueForm).should("not.exist");
  }

  validateIssueExistsInBacklog(issueTitle) {
    cy.get(selectors.backlogList).within(() => {
      //cy.wait(500);
      cy.contains(issueTitle).should("exist");
    });
  }

  validateIssueExistsInInProgress(issueTitle) {
    cy.get(selectors.inProgressList).within(() => {
      cy.contains(issueTitle).should("exist");
    });
  }

  openIssueOnBoard(issueTitle) {
    cy.contains(issueTitle).click();
  }
}
