//firstly import test method from playwright library
import { test } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  //pm stands for PageManager
  const pm = new PageManager(page);
  await pm.onNavigationPage().navigateToFormLayoutsPage();
});

// test("Should navigate to form layouts page", async ({ page }) => {
//   const navigateTo = new NavigationPage(page);
//   await navigateTo.navigateToFormLayoutsPage();
// });

// test("Locator syntax rules", async ({ page }) => {
//   await page.locator("input").first().click();
// });

// test("user facing locators", async ({ page }) => {
//   await page.getByRole("textbox", { name: "Email" }).first().click();
//   await page.getByRole("button", { name: "Sign in" }).first().click();

//   await page.getByLabel("Email").first().click();
// });

// test("locating child elements", async ({ page }) => {
//   await page.locator('nb-card nb-radio :text-is ("Option 1")').click();
//   await page
//     .locator("nb-card")
//     .locator("nb-radio")
//     .locator(':text-is ("Option 2")')
//     .click();

//   await page
//     .locator("nb-card")
//     .getByRole("button", { name: "Sign in" })
//     .first()
//     .click();
// });

test("Should fill Basic form and click on submit button successfully", async ({
  page,
}) => {
  const pm = new PageManager(page);
  await pm.onFormLayoutsPage().fillAndSubmitBasicForm();

  // const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
  // const emailField = basicForm.getByRole("textbox", { name: "Email" });
  // const passwordField = basicForm.getByRole("textbox", { name: "Password" });

  // await emailField.fill("test@test.com");
  // await passwordField.fill("Password123");
  // await basicForm.locator("nb-checkbox").click();
  // await basicForm.getByRole("button").click();

  // await expect(emailField).toHaveValue("test@test.com");
});
