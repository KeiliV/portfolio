class CreateNewIssue {
  constructor() {
    this.createNewIssueButton = '[data-testid="icon:plus"]';
    this.title = 'input[name="title"]';
    this.descriptionField = ".ql-editor";
    this.assignee = '[data-testid="select:userIds"]';
    this.assigneeNameOne = '[data-testid="select-option:Pickle Rick"]';
    this.reporterId = '[data-testid="select:reporterId"]';
    this.submitButton = 'button[type="submit"]';
    this.createNewIssueModal = '[data-testid="modal:issue-create"]';
    this.issueType = '[data-testid="select:type"]';
    this.backlogList = '[data-testid="board-list:backlog"]';
    this.issuesList = '[data-testid="list-issue"]';
    this.priorityType = '[data-testid="select:priority"]';
    this.closeIcon = '[data-testid="icon:close"]';
  }

  getCreateIssueModal() {
    return cy.get(this.createNewIssueModal);
  }

  createNewIssueOnlyRequiredFields(issueDetails) {
    this.getCreateIssueModal().within(() => {
      //wait added due to issue in app: occasionally too slow to type whole text
      cy.get(this.title).wait(1000).type(issueDetails.title);
      cy.get(this.submitButton).click();
    });
  }

  createNewIssueAllFields(issueDetails) {
    this.getCreateIssueModal().within(() => {
      cy.get(this.title).wait(1000).type(issueDetails.title);
      cy.get(this.descriptionField).type(issueDetails.description);
      cy.get(this.assignee).click();
      cy.get(this.assigneeNameOne).click();
      cy.get(this.submitButton).click();
    });
  }

  validateNewIssueIsVisibleOnBoard(issueDetails) {
    cy.get(this.createNewIssueModal).should("not.exist");
    cy.contains("Issue has been successfully created.").should("be.visible");
    cy.reload();
    cy.contains(issueDetails.title).should("be.visible");
  }

  openIssue(issueDetails) {
    cy.contains(issueDetails.title).click();
  }
}

export default CreateNewIssue;
