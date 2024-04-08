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

  it.only("Should add, edit and remove estimated time successfully", function () {
    const createIssueForm1 = this.page.clickCreateIssueButton();
    //CREATE AND VALIDATE NEW ISSUE WITH NO TIME LOGGED
    cy.log("");
    createIssueForm1.createNewIssueOnlyRequiredFields(issueDetails);
    this.page.validateIssueIsVisibleOnBoard(issueDetails);
    //OPEN ISSUE
    //if i open it like that here, how to i open the issue again later in this test without creating another instance of the class??
    const issueModal1 = this.page.clickIssueCard(issueDetails.title);
    //ADD ESTIMATE TIME
    issueModal1.enterValueInEstimateHoursField(10);
    issueModal1.validateEstimatedHoursLabelText("10h estimated");

    //EDIT ESTIMATED TIME
    issueModal1.enterValueInEstimateHoursField(20);
    issueModal1.validateEstimatedHoursLabelText("20h estimated");

    //REMOVE ESTIMATED TIME
    cy.get('input[placeholder="Number"]').eq(0).clear().blur().wait(1000);
    cy.get('input[placeholder="Number"]').eq(0).should("be.visible");
  });

  it("Should log time and remove logged time succesfully", function () {
    const createIssueForm2 = this.page.clickCreateIssueButton();
    //CREATE A NEW ISSUE
    createIssueForm2.createNewIssueOnlyRequiredFields(issueDetails);
    cy.log("");
    this.page.validateIssueIsVisibleOnBoard(issueDetails);
    ////ADD ESTIMATED TIME AS A PRECONDITION
    const issueModal2 = this.page.clickIssueCard(issueDetails.title);
    issueModal2.enterValueInEstimateHoursField(10);
    //LOG TIME TO ISSUE
    issueModal2.openTimeTrackingModal();

    issueModal2.validateTimeTrackingPopUpIsVisible().within(() => {
      cy.get('input[placeholder="Number"]').eq(0).type(2).blur();
    });

    issueModal2.validateTimeLabelsAreReplaced("2h logged", "No time logged");

    cy.get('[data-testid="modal:tracking"]').within(() => {
      cy.get('input[placeholder="Number"]').eq(1).type(5).blur();
    });
    issueModal2.validateTimeLabelsAreReplaced("5h remaining", "10h estimated");
    issueModal2.submitLoggedTime();

    //REMOVE LOGGED TIME
    issueModal2.openTimeTrackingModal();
    issueModal2.validateTimeTrackingPopUpIsVisible().within(() => {
      cy.get('input[placeholder="Number"]').eq(0).clear().blur();
      cy.get('input[placeholder="Number"]').eq(1).clear().blur();
    });
    issueModal2.submitLoggedTime();

    //Validate no time is logged
    issueModal2.validateTimeLoggedLableText("No time logged");
  });
});
