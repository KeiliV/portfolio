import { Page } from "@playwright/test";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";
import { DashboardPage } from "../page-objects/dashboardPage";

export class PageManager {
  static onFormLayoutsPage() {
    throw new Error("Method not implemented.");
  }
  private readonly page: Page;
  private readonly dashboardPage: DashboardPage;
  private readonly formLayoutsPage: FormLayoutsPage;

  constructor(page: Page) {
    this.page = page;
    this.dashboardPage = new DashboardPage(this.page);
    this.formLayoutsPage = new FormLayoutsPage(this.page);
  }

  //need to create the methods that will return all the instances of the page objects
  onDashboardPage() {
    return this.dashboardPage;
  }

  onFormLayoutsPage() {
    return this.formLayoutsPage;
  }
}
