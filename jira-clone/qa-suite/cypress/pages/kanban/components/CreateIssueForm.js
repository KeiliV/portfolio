const selectors = {
  titleInput: 'input[name="title"]',
  descriptionField: ".ql-editor",
  assignee: '[data-testid="select:userIds"]',
  reporterId: '[data-testid="select:reporterId"]',
  submitButton: 'button[type="submit"]',
  issueType: '[data-testid="select:type"]',
  issuesList: '[data-testid="list-issue"]',
  priorityType: '[data-testid="select:priority"]',
  closeIcon: '[data-testid="icon:close"]',
};
// each instance of CreateIssueFrom will use the selectors object as a shared dictionary, as opposed to the method youve ben using which creates
// properties and strings on each individual instance

export default class CreateIssueForm {
  constructor(cyElement) {
    this.root = cyElement;
    // so now each time we instantiate the CreateIssueForm class, JS will create a blank object, set its class to CreateIssueForm,
    // then bind this contsructor to that object and execute it, which will set the property 'root' on that object to be cyElement
  }

  createNewIssueOnlyRequiredFields(issueDetails) {
    return this.root.within(() => {
      this.titleInput().wait(1000).type(issueDetails.title);
      this.submitButton().click();
    });
  }

  createNewIssueAllFields(issueDetails) {
    return this.root.within(() => {
      this.titleInput().wait(1000).type(issueDetails.title);
      this.descriptionInput().type(issueDetails.description);
      this.openAssigneeSelection().click();
      this.assigneeName(issueDetails.assigneeSelector).click();
      //cy.get(issueDetails.assigneeName).click();
      this.submitButton().click();
    });
  }

  clearAllRequiredFieldsInCreateIssueForm() {
    return this.root.within(() => {
      cy.get(selectors.reporterId).click();
      cy.get(selectors.closeIcon).click();
      cy.get(selectors.issueType).click();
      cy.get(selectors.closeIcon).click();
      cy.get(selectors.priorityType).click();
      cy.get(selectors.closeIcon).click();
      //need to click somewhere to make submit button visible
      cy.get(selectors.descriptionField).click();
    });
  }

  ////// cyElements
  titleInput() {
    return this.root.find(selectors.titleInput);
  }

  submitButton() {
    return cy.get(selectors.submitButton);
    //return this.root.find(selectors.submitButton);
  }

  descriptionInput() {
    return cy.get(selectors.descriptionField);
  }

  openAssigneeSelection() {
    return cy.get(selectors.assignee);
  }

  assigneeName(selector) {
    return cy.get(selector);
  }
}
