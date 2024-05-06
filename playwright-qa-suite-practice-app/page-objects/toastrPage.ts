import { Locator, Page, expect } from "@playwright/test";

export class ToastrPage {
  readonly page: Page;
  readonly allCheckBoxes: Locator;

  constructor(page: Page) {
    this.page = page;
  }
}
