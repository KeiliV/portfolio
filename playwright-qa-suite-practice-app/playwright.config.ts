import { defineConfig, devices } from "@playwright/test";

//require("dotenv").config();

export default defineConfig({
  timeout: 40000,
  globalTimeout: 60000,

  expect: {
    timeout: 2000,
  },

  retries: 1,
  reporter: "html",

  use: {
    baseURL: "http://localhost:4200/",

    trace: "on-first-retry",
    actionTimeout: 20000,
    navigationTimeout: 25000,
    video: {
      mode: "off",
      size: { width: 1920, height: 1080 },
    },
  },

  projects: [
    {
      name: "chromium",
    },

    {
      name: "firefox",
      use: {
        browserName: "firefox",
      },
    },
  ],
});
