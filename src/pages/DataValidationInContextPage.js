const { expect } = require("@playwright/test");
const { BasePage } = require("./BasePage");

exports.DataValidationInContextPage = class DataValidationInContextPage extends (
  BasePage
) {
  constructor(page) {
    super();
    this.page = page;
    this.iframe = this.page.frameLocator("//iframe[@id='veriffFrame']");
    this.txtMessage = page.locator("//h1[text()='Please have your {1} ready.']");
    this.imgDocument = page.locator("//img[contains(@src,'{1}')]");
    this.btnContinue = page.locator("//button[text()='Continue']");
    this.txt = page.locator("//h1");
  }

  async isTextMessageDisplayed(text) {
    this.txtMessage = await this.replace(this.txtMessage, text, this.iframe);
    console.log(await this.txtMessage.textContent());
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    console.log(await this.page.title());
    await expect(this.txtMessage).toHaveText(
      "Please have your " + text + " ready."
    );
  }

  async isImgDisplayed(image) {
    this.imgDocument = await this.replace(this.imgDocument, image, this.iframe);
    return await this.imgDocument.textContent();
  }

  async clickOnContinueButton() {
    await this.btnContinue.click();
  }
};
