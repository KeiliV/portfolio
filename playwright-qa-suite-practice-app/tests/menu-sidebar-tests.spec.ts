import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
  const pageManager = new PageManager(page);
  await pageManager.onDashboardPage().goToHomePage();
});

test("Should click on side menu items and load corresponding page successfully", async ({
  page,
}) => {
  const pageManager = new PageManager(page);
  await pageManager.onDashboardPage().navigateToFormLayoutsPage();
  await expect(page).toHaveURL(new RegExp("/forms/layouts$"));

  await pageManager.onDashboardPage().navigateToDatePickerPage();
  await expect(page).toHaveURL(new RegExp("/forms/datepicker$"));

  await pageManager.onDashboardPage().navigateToDialogPage();
  await expect(page).toHaveURL(new RegExp("/modal-overlays/dialog$"));

  await pageManager.onDashboardPage().navigateToWindowPage();
  await expect(page).toHaveURL(new RegExp("/modal-overlays/window$"));

  await pageManager.onDashboardPage().navigateToPopoverPage();
  await expect(page).toHaveURL(new RegExp("/modal-overlays/popover$"));

  await pageManager.onDashboardPage().navigateToToastrPage();
  await expect(page).toHaveURL(new RegExp("/modal-overlays/toastr$"));

  await pageManager.onDashboardPage().navigateToTooltipPage();
  await expect(page).toHaveURL(new RegExp("/modal-overlays/tooltip$"));

  await pageManager.onDashboardPage().navigateToCalendarPage();
  await expect(page).toHaveURL(new RegExp("/extra-components/calendar$"));

  //await pageManager.onDashboardPage().navigateToEchartsPage();
  //await expect(page).toHaveURL(new RegExp("/charts/echarts$"));

  await pageManager.onDashboardPage().navigateToSmartTablePage();
  await expect(page).toHaveURL(new RegExp("/tables/smart-table$"));

  await pageManager.onDashboardPage().navigateToTreeGridPage();
  await expect(page).toHaveURL(new RegExp("/tables/tree-grid$"));
});
