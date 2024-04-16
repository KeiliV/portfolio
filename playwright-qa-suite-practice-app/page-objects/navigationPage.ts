import { Page } from "@playwright/test";

export class NavigationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToFormLayoutsPage() {
    //await this.page.getByText("Forms").click();
    await this.selectGroupMenuItem("Forms");
    await this.page.getByText("Form Layouts").click();
  }

  async navigateToDatePickerPage() {
    await this.page.getByText("Forms").click();
    await this.page.getByText("Datepicker").click();
  }

  //private: will not be visible outside this class
  //Forms menu item needs to be expanded to be able to click on Datepicker after clicking on Form Layouts,
  //solved it by creating this internal method to chech wheater the menu is exanded or not based on the state
  //it will either click on the item to open menu or will skip if the menu is already expanded
  private async selectGroupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    const expandedState = await groupMenuItem.getAttribute("aria-expanded");
    if (expandedState == "false") await groupMenuItem.click();
  }
}
