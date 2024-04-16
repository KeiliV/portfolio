import { test as base } from "@playwright/test";
import { PageManager } from '../page-objects'
export type TestOptions = {
  globalsQaURL: string;
  formLayoutsPage: string;
};

export const test = base.extend<TestOptions>({
  globalsQaURL: ["", { option: true }],

  formLayoutsPage: [async ({ page }, use) => {
    await page.goto("/");
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
    await use("");
  }, {auto: true}],

  pageManager: 
});
