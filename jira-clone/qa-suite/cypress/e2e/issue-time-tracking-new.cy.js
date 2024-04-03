import KanbanPage from "../pages/kanban";

describe("Time Tracking Functionality", () => {
  beforeEach(() => {
    const page = new KanbanPage();
    page.visit("/");
    cy.wrap(page).as("page");
  });

  const issueDetails = {
    title: "This is a new issue to test time estimation",
  };

  it("Should add, edit and remove time estimation successfully", function () {
    const createIssueForm = this.page.clickCreateIssueButton();
    //CREATE AND VALIDATE NEW ISSUE WITH NO TIME LOGGED
    cy.log("");
    createIssueForm.createNewIssueOnlyRequiredFields(issueDetails);
    this.page.validateIssueIsVisibleOnBoard(issueDetails);
    //OPEN ISSUE
    //if i open it like that here, how to i open the issue again later in this test without creating another instance of the class??
    const issueModal = this.page.clickIssueCard(issueDetails.title);
    //ADD ESTIMATE TIME
    issueModal.enterValueInEstimateHoursField(10);
    issueModal.ensureTimeTrackingEstimatedHoursLabelContains("10h estimated");

    //EDIT ESTIMATED TIME
    issueModal.enterValueInEstimateHoursField(20);
    issueModal.ensureTimeTrackingEstimatedHoursLabelContains("20h estimated");

    //REMOVE ESTIMATED TIME

    //fix from here
    cy.get('input[placeholder="Number"]').eq(0).clear().blur().wait(1000);
    issueModal
      .ensureTimeTrackingEstimatedHoursLabelContains("20h estimated")
      .should("not.exist");
    //cy.get('input[placeholder="Number"]').eq(0).should("be.visible");
  });
});
