import { Locator, Page } from "@playwright/test";

export class FormLayoutsPage {
  readonly page: Page;
  readonly basicForm: Locator;
  readonly basicFormEmailField: Locator;
  readonly basicFormPassworfField: Locator;
  readonly basicFormCheckBox: Locator;
  readonly basicFormSubmitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
    this.basicFormEmailField = page
      .locator("nb-card")
      .filter({ hasText: "Basic form" })
      .getByRole("textbox", { name: "Email" });
    this.basicFormPassworfField = page
      .locator("nb-card")
      .filter({ hasText: "Basic form" })
      .getByRole("textbox", { name: "Password" });
    this.basicFormSubmitButton = page
      .locator("nb-card")
      .filter({ hasText: "Basic form" })
      .getByRole("button");
    this.basicFormCheckBox = page
      .locator("nb-card")
      .filter({ hasText: "Basic form" })
      .locator("nb-checkbox");
  }

  async fillAndSubmitBasicForm() {
    await this.basicFormEmailField.fill("email@email.com");
    await this.basicFormPassworfField.fill("password");
    await this.basicFormCheckBox.click();
    await this.basicFormSubmitButton.click();
  }
}
