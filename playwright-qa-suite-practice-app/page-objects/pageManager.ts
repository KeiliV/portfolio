//created a page manager so later I can interact only with this manager page in my test files to prevent
//importing an instance of each page separately in each sepc file.

import { Page } from "@playwright/test";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";
import { DashboardPage } from "../page-objects/dashboardPage";
import { ToastrPage } from "./toastrPage";

export class PageManager {
  static onFormLayoutsPage() {
    throw new Error("Method not implemented.");
  }

  // page fixtures??
  private readonly page: Page;
  private readonly dashboardPage: DashboardPage;
  private readonly formLayoutsPage: FormLayoutsPage;
  private readonly toastrPage: ToastrPage;

  constructor(page: Page) {
    //need to call all our pages, need to initialise all our pages
    this.page = page;
    this.dashboardPage = new DashboardPage(this.page);
    this.formLayoutsPage = new FormLayoutsPage(this.page);
    this.toastrPage = new ToastrPage(this.page);
  }

  //need to create the methods that will return all the instances of the page objects
  onDashboardPage() {
    return this.dashboardPage;
  }

  onFormLayoutsPage() {
    return this.formLayoutsPage;
  }

  onToasterPage() {
    return this.toastrPage;
  }
}
