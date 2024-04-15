import { test, expect, request } from "@playwright/test";
import tags from "../test-data/tags.json";

test.beforeEach(async ({ page }) => {
  //when you want to create a mock, you need to configure it inside of the Playwright framework BEFORE
  //browser make a call to the certain API. Otwerwise PW won't know wich API needs to be intercepted

  await page.route(
    "https://conduit-api.bondaracademy.com/api/tags",
    async (route) => {
      //now we need to create the object that we want to be used as the mock
      await route.fulfill({
        body: JSON.stringify(tags),
      });
    }
  );

  await page.goto("https://conduit.bondaracademy.com/");
  //log in to the application
  await page.getByText("Sign in").click();
  await page.getByRole("textbox", { name: "Email" }).fill("kvutt@email.com");
  await page.getByRole("textbox", { name: "Password" }).fill("Password123");
  await page.getByRole("button").click();
});

test("Should update article title and description successfully ", async ({
  page,
}) => {
  await page.route(
    "https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0",
    async (route) => {
      const response = await route.fetch(); //with this command I am telling PW to complete the API call and return a result. Saving this response into constant response
      //now I need to get JSON body from this request:
      const responseBody = await response.json();
      //now I will update the response body with new values:
      responseBody.articles[0].title = "This is a MOCK test title";
      responseBody.articles[0].description = "This is a MOCK test description";

      //now I will fulfill the modified response as a desired response to the application:
      await route.fulfill({
        body: JSON.stringify(responseBody),
      });
    }
  );

  await page.getByText("Global").click();
  await expect(page.locator("app-article-list h1").first()).toContainText(
    "This is a MOCK test title"
  );
  await expect(page.locator("app-article-list p").first()).toContainText(
    "This is a MOCK test description"
  );
});

test("Should create and delete article successfully", async ({
  page,
  request,
}) => {
  const response = await request.post(
    "https://conduit-api.bondaracademy.com/api/users/login",
    {
      //note: in PW for some reason the request body is called data
      data: {
        user: { email: "kvutt@email.com", password: "Password123" },
      },
    }
  );
  //getting access token
  const responseBody = await response.json();
  const accessToken = responseBody.user.token;

  //CREATE ARTICLE
  const articleResponse = await request.post(
    "https://conduit-api.bondaracademy.com/api/articles/",
    {
      data: {
        article: {
          title: "Test title",
          description: "Test description",
          body: "Test body",
          tagList: [],
        },
      },
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    }
  );
  //assert that article was posted successfully
  expect(articleResponse.status()).toEqual(201);

  //DELETE ARTICLE
  await page.getByText("Global").click();
  await page.getByText("Test title").click();
  await page.getByRole("button", { name: "Delete Article" }).first().click();
  await page.getByText("Global").click();

  //validate article does not exist
  await expect(page.locator("app-article-list h1").first()).not.toContainText(
    "Test title"
  );
});
