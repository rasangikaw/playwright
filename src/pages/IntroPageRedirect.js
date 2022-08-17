const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

exports.IntroPageRedirect = class IntroPageRedirect extends BasePage {

    constructor(page) {
        super();
        this.page = page;

        this.lnkContinueWithCurrentDevice = page.locator("//button[text()='Continue with your current device']");
        this.btnStartSession = page.locator("//button[text()='Start session']");
        this.iFrame = page.locator("//iframe[@id='veriffFrame']");
    }

    async switchToIframe() {
        await this.page.frame("//iframe[@id='veriffFrame']");
    }

    async clickOnStartSession() {
        await this.clickOnContinueWithCurrentDevice();
        await this.clickOnStartSessionButton();
    }

    async isRedirectIntroPageDisplayed() {
        await expect(this.page).toHaveTitle("Veriff");
    }

    async isIncontextIntroPageDisplayed() {
        await expect(this.page).toHaveTitle("Veriff - Demo Integration");
    }

    async clickOnContinueWithCurrentDevice() {
        await this.lnkContinueWithCurrentDevice.click();
    }

    async clickOnStartSessionButton() {
        await this.btnStartSession.click();
    }
}