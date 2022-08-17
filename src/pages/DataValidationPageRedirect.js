const { expect } = require("@playwright/test");
const { BasePage } = require("./BasePage");

exports.DataValidationPageRedirect = class DataValidationPageRedirect extends (
  BasePage
) {
  constructor(page) {
    super();
    this.page = page;

    this.txtMessage = page.locator(
      "//h1[text()='Please have your {1} ready.']"
    );
    this.imgDocument = page.locator("//img[contains(@src,'{1}')]");
    this.btnContinue = page.locator("//button[text()='Continue']");
  }

  async isTextMessageDisplayed(text) {
    this.txtMessage = await this.replace(this.txtMessage, text, this.page);
    await expect(this.txtMessage).toHaveText(
      "Please have your " + text + " ready."
    );
  }

  async isImgDisplayed(image) {
    this.imgDocument = await this.replace(this.imgDocument, image, this.page);
    return await this.imgDocument.isVisible();
  }

  async clickOnContinueButton() {
                console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
        console.log(await this.page.content());
    await this.btnContinue.click();
  }
};
