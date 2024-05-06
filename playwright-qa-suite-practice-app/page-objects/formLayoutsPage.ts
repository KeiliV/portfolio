import { Locator, Page } from "@playwright/test";

export class FormLayoutsPage {
  readonly page: Page;
  readonly basicForm: Locator;
  readonly basicFormEmailField: Locator;
  readonly basicFormPassworfField: Locator;
  readonly basicFormCheckBox: Locator;
  readonly basicFormSubmitButton: Locator;
  readonly inlineFormNameField: Locator;
  readonly inlineFormEmailField: Locator;
  readonly inlineFormCheckbox: Locator;
  readonly inlineFormSubmitButton: Locator;

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
    this.inlineFormNameField = page
      .locator("nb-card")
      .filter({ hasText: "Inline form" })
      .getByRole("textbox", { name: "Jane Doe" });
    this.inlineFormEmailField = page
      .locator("nb-card")
      .filter({ hasText: "Inline form" })
      .getByRole("textbox", { name: "email" });
    this.inlineFormCheckbox = page
      .locator("nb-card")
      .filter({ hasText: "Inline form" })
      .getByRole("checkbox", { name: "Remember me" });
    this.inlineFormSubmitButton = page
      .locator("nb-card")
      .filter({ hasText: "Inline form" })
      .getByRole("button");
  }

  async fillAndSubmitBasicForm(email: string, password: string) {
    await this.basicFormEmailField.fill(email);
    await this.basicFormPassworfField.fill(password);
    await this.basicFormCheckBox.click();
    await this.basicFormSubmitButton.click();
  }

  async fillInlineFormFieldsAndSubmit(name: string, email: string) {
    await this.inlineFormNameField.fill(name);
    await this.inlineFormEmailField.fill(email);
    await this.inlineFormCheckbox.check({ force: true });
    await this.inlineFormSubmitButton.click();
  }
}
