const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

exports.IntroPageIncontext = class IntroPageIncontext extends BasePage {

    constructor(page) {
        super();
        this.page = page;

        this.lnkContinueWithCurrentDevice = page.locator("//button[text()='Continue with your current device']");
        this.btnStartSession = page.locator("//button[text()='Start session']");
        this.iFrame = page.locator("//iframe[@id='veriffFrame']");
        this.btnStartDemo = page.locator("//button[text()='Start Demo']");
    }

    async switchToIframe() {
        await this.page.frame("//iframe[@id='veriffFrame']");
    }

    async clickOnStartDemo() {
        await this.btnStartDemo.click();
    }

    async clickOnStartSession() {
        const iframe = await this.page.frameLocator("//iframe[@id='veriffFrame']");
        await iframe.locator("//button[text()='Continue with your current device']").click();
        await iframe.locator("//button[text()='Start session']").click();
    }

    async isRedirectIntroPageDisplayed() {
        await expect(this.page).toHaveTitle("Intro - Let's get you verified - Veriff");
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