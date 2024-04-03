const selectors = {
  titleName: 'placeholder=["Short summary"]',
  issueType: '[data-testid="select:type"]',
  issueStatus: '[data-testid="select:status"]',
  assignees: '[data-testid="select:assignees"]',
  reporterId: '[data-testid="select:reporter"]',
  selectPriority: '[data-testid="select:priority"]',
  modalCloseButton: '[data-testid="icon:close"]',
  timeInputField: 'input[placeholder="Number"]',
};

export default class IssueModal {
  constructor(cyElement) {
    this.root = cyElement;
  }

  editIssueTitle() {
    return this.root.within(() => {
      cy.get(selectors.titleName).click();
    });
  }

  changeIssueType(issueDetails) {
    return this.root.within(() => {
      cy.get(selectors.issueType).click();
      cy.get(issueDetails.newType).click();
    });
  }

  changeIssueStatus(issueDetails) {
    cy.get(selectors.issueStatus).click();
    cy.get(issueDetails.newStatus).click();
  }

  changeIssueReporter(issueDetails) {
    cy.get(selectors.reporterId).click();
    cy.get(issueDetails.newReporter).click();
  }

  changeIssuePriority(issueDetails) {
    cy.get(selectors.selectPriority).click();
    cy.get(issueDetails.newPriority).click();
  }

  closeIssueModal() {
    return this.root.within(() => {
      cy.get(selectors.modalCloseButton).eq(0).click();
    });
  }

  /////Time Tracking
  enterValueInEstimateHoursField(inputHours) {
    cy.get(selectors.timeInputField).eq(0).clear().type(inputHours).blur();
  }

  ensureTimeTrackingEstimatedHoursLabelContains(estimatedHours) {
    return cy
      .get('[data-testid="icon:stopwatch"]')
      .next()
      .contains(estimatedHours);
  }

  ////// cyElements
}
