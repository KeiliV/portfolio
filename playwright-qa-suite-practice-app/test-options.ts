import { test as base } from "@playwright/test";
import { PageManager } from "./page-objects/pageManager";

export type TestOptions = {
  formLayoutsPage: string;
  pageManager: PageManager;
};

export const test = base.extend<TestOptions>({
  formLayoutsPage: [
    async ({ page }, use) => {
      await page.goto("/");
      await page.getByText("Forms").click();
      await page.getByText("Form Layouts").click();
      await use("");
    },
    //by provifing auto true I am saying that formLayoutPage should be automatically
    //initialised as the very first thing when we run the test
    { auto: true },
  ],

  pageManager: async ({ page }, use) => {
    const pm = new PageManager(page);
    await use(pm);
  },
});
