const selectors = {
  titleName: 'placeholder=["Short summary"]',
  issueType: '[data-testid="select:type"]',
  issueStatus: '[data-testid="select:status"]',
  assignees: '[data-testid="select:assignees"]',
  reporterId: '[data-testid="select:reporter"]',
  selectPriority: '[data-testid="select:priority"]',
  modalCloseButton: '[data-testid="icon:close"]',
  timeInputField: 'input[placeholder="Number"]',
  stopwatchIcon: '[data-testid="icon:stopwatch"]',
  timeTrackingModal: '[data-testid="modal:tracking"]',
};

export default class IssueModal {
  constructor(cyElement, cyElement2) {
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
    return this.root.within(() => {
      cy.get(selectors.issueStatus).click();
      cy.get(issueDetails.newStatus).click();
    });
  }

  changeIssueReporter(issueDetails) {
    return this.root.within(() => {
      cy.get(selectors.reporterId).click();
      cy.get(issueDetails.newReporter).click();
    });
  }

  changeIssuePriority(issueDetails) {
    return this.root.within(() => {
      cy.get(selectors.selectPriority).click();
      cy.get(issueDetails.newPriority).click();
    });
  }

  closeIssueModal() {
    return this.root.within(() => {
      cy.get(selectors.modalCloseButton).eq(0).click();
    });
  }

  /////Time Estimation
  enterValueInEstimateHoursField(inputHours) {
    return this.root.within(() => {
      cy.get(selectors.timeInputField).eq(0).clear().type(inputHours).blur();
    });
  }

  validateEstimatedHoursLabelText(estimatedHours) {
    return cy
      .get(selectors.stopwatchIcon)
      .next()
      .should("contain", estimatedHours);
  }

  validateTimeLoggedLableText(timeLogged) {
    return this.root.within(() => {
      cy.get(selectors.stopwatchIcon)
        .next()
        .wait(500)
        .should("contain", timeLogged);
    });
  }

  //////Time tracking Modal
  /// decided not to make a separate page object for time tracker modal because it is only accessible via
  // the issue modal and is not a complicated functionality on the page. Time tracker is its own div under root
  openTimeTrackingModal() {
    cy.get(selectors.stopwatchIcon).click();
  }

  closeTimeTrackingModal() {
    cy.get(selectors.modalCloseButton).click();
  }

  submitLoggedTime() {
    cy.contains("button", "Done").click();
  }

  validateTimeTrackingPopUpIsVisible() {
    return cy.get(selectors.timeTrackingModal).should("be.visible");
  }

  validateTimeLabelsAreReplaced(addedTime, removedTime) {
    cy.get(selectors.stopwatchIcon)
      .next()
      .contains(addedTime)
      .contains(removedTime)
      .should("not.exist");
  }

  ////// cyElements
}
