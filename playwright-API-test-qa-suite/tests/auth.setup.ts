import { test as setup } from "@playwright/test";
import user from "../.auth/user.json";
import fs from "fs";

const authFile = ".auth/user.json";

setup("authentication", async ({ request }) => {
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
  user.origins[0].localStorage[0].value = accessToken;
  fs.writeFileSync(authFile, JSON.stringify(user));

  process.env["ACCESS_TOKEN"] = accessToken;
});

//AUTHENTICATION VIA UI

// setup("authentication", async ({ page }) => {
//   await page.goto("https://conduit.bondaracademy.com/");
//   //log in to the application
//   await page.getByText("Sign in").click();
//   await page.getByRole("textbox", { name: "Email" }).fill("kvutt@email.com");
//   await page.getByRole("textbox", { name: "Password" }).fill("Password123");
//   await page.getByRole("button").click();
//   await page.waitForResponse("https://conduit-api.bondaracademy.com/api/tags");

//   await page.context().storageState({ path: authFile });
// });
