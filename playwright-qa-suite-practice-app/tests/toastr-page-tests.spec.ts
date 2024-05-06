import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

let pageManager;

test.beforeEach(async ({ page }) => {
  pageManager = new PageManager(page);
  await pageManager.onDashboardPage().goToHomePage();
  await pageManager.onDashboardPage().navigateToToastrPage();
});

//how can I still create the const below but not use page.
test("Should check all checkboxes on toastr page", async ({ page }) => {
  const allCheckBoxes = page.getByRole("checkbox");

  await page
    .getByRole("checkbox", { name: "Hide on click" })
    .uncheck({ force: true });

  for (const box of await allCheckBoxes.all()) {
    await box.check({ force: true });
    expect(await box.isChecked()).toBeTruthy();
  }
});

test("Should open position drop-down and select a new position succesfully", async ({}) => {});
