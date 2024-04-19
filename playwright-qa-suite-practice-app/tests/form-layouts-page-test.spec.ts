//firstly import test method from playwright library
import { test } from "@playwright/test";
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
  //const pageManager = new PageManager(page);
  await pageManager.onFormLayoutsPage().fillAndSubmitBasicForm();
});
