import { Page } from "@playwright/test";
import { PageManager } from "./pageManager";

export class DashboardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToHomePage() {
    await this.page.goto("/");
  }

  async navigateToFormLayoutsPage() {
    //await this.page.getByText("Forms").click();
    await this.selectGroupMenuItem("Forms");
    await this.page.getByText("Form Layouts").click();
  }

  async navigateToDatePickerPage() {
    await this.selectGroupMenuItem("Forms");
    await this.page.getByText("Datepicker").click();
  }

  async navigateToDialogPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.page.getByText("Dialog").click();
  }

  async navigateToWindowPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.page.getByText("Window").click();
  }

  async navigateToToastrPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.page.getByText("Toastr").click();
  }

  async navigateToTooltipPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.page.getByText("Tooltip").click();
  }

  async navigateToCalendarPage() {
    await this.selectGroupMenuItem("Extra Components");
    await this.page.getByText("Calendar").click();
  }

  async navigateToEchartsPage() {
    //needs a fix, charts results in 2 elements
    await this.selectGroupMenuItem("Charts");
    await this.page.getByText("Echarts").click();
  }

  async navigateToPopoverPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.page.getByText("Popover").click();
  }

  async navigateToSmartTablePage() {
    await this.selectGroupMenuItem("Tables & Data");
    await this.page.getByText("Smart Table").click();
  }

  async navigateToTreeGridPage() {
    await this.selectGroupMenuItem("Tables & Data");
    await this.page.getByText("Tree Grid").click();
  }

  async navigateToLoginPage() {
    await this.selectGroupMenuItem("Auth");
    await this.page.getByText("Login").click();
  }

  //private: will not be visible outside this class
  //Forms menu item needs to be expanded to be able to click on Datepicker after clicking on Form Layouts,
  //solved it by creating this internal method to check weather the menu is exanded or not based on the state
  //it will either click on the item to open menu or will skip if the menu is already expanded
  private async selectGroupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    const expandedState = await groupMenuItem.getAttribute("aria-expanded");
    if (expandedState == "false") await groupMenuItem.click();
  }
}
