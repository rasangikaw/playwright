const { expect } = require("@playwright/test");

exports.countryselection = class countryselection {
  //page locators:
  constructor(page) {
    const drpdwnSelectCountry = page.locator(
      "//select[@class='s1ivgrff s1tibt8p']"
    );
    const btnContinue = page.locator("//button[text()='Continue']");
  }

  async isPageTitleDisplayed() {
    await expect(page).toHaveTitle("Country - Select issuing country - Veriff");
  }

  async selectCountry(country) {
    await this.drpdwnSelectCountry.selectOption(
      new SelectOption().setLabel(country)
    );
  }

  async clickOnContinueButton() {
    await this.btnContinue.click();
  }
};
