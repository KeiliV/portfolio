//firstly import test method from playwright library
import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
//import { faker } from "@faker-js/faker";

//check out: https://codilime.com/blog/page-object-model-with-playwright-and-typescript/
let pageManager;

//faker example: const randomFullName = faker.name.fullName()
test.beforeEach(async ({ page }) => {
  pageManager = new PageManager(page);
  await pageManager.onDashboardPage().goToHomePage();
  await pageManager.onDashboardPage().navigateToFormLayoutsPage();
});

test("example:Should fill Basic form and click on submit button successfully", async ({}) => {
  await pageManager
    .onFormLayoutsPage()
    .fillAndSubmitBasicForm("email@email.com", "password");
});

test("Should fill Inline Form fields and click on submit button successfully", async ({}) => {
  await pageManager
    .onFormLayoutsPage()
    .fillInlineFormFieldsAndSubmit("Jane Doe", "email@email.com");
});
