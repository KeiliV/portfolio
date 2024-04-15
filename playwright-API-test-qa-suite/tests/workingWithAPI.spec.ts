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
});

test("Should update article title and description successfully ", async ({
  page,
}) => {
  await page.route(
    "https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0",
    async (route) => {
      //must add a wait because PW has a bug in the framework that closing the browser before its acutally able to fulfill the request
      await page.waitForTimeout(1000);
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

test("Should create new article successfully and delete the article via API call", async ({
  page,
  request,
}) => {
  //Create new article
  await page.getByText("New Article").click();
  await page
    .getByRole("textbox", { name: "Article Title" })
    .fill("Test article number 2");
  await page
    .getByRole("textbox", { name: "What's this article about?" })
    .fill("This is an article for API test");
  await page
    .getByRole("textbox", { name: "Write your article (in markdown)" })
    .fill("This is article body");
  await page.getByRole("button", { name: "Publish Article" }).click();

  //intercepting the call of publishing the article and get the slug ID to use after for deleting the article via API:
  //waiting for the API call to be finished and saving the response into a variable
  const articleResponse = await page.waitForResponse(
    "https://conduit-api.bondaracademy.com/api/articles/"
  );
  //getting the article response body and saving it into a variable:
  const articleResponseBody = await articleResponse.json();
  //from  JSON response body getting the slug ID:
  const slugId = articleResponseBody.article.slug;

  //Validate article was created
  await expect(page.locator(".article-page h1")).toContainText(
    "Test article number 2"
  );
  //Validate article is visible on Global feed page
  await page.getByText("Home").click();
  await page.getByText("Global Feed").click();
  await expect(page.locator("app-article-list h1").first()).toContainText(
    "Test article number 2"
  );

  const deleteArticleResponse = await request.delete(
    `https://conduit-api.bondaracademy.com/api/articles/${slugId}`
  );
  expect(deleteArticleResponse.status()).toEqual(204);
});
