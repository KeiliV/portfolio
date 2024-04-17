//firstly import test method from playwright library
import { test } from "../test-options";
//import { faker } from "@faker-js/faker";

//faker example: const randomFullName = faker.name.fullName()

test("Should fill Basic form and click on submit button successfully", async ({
  pageManager,
}) => {
  //made fixture to create an instance of the PageManager in test-options file
  await pageManager.onFormLayoutsPage().fillAndSubmitBasicForm();
});
