const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

exports.PrivacyPolicyPage = class PrivacyPolicyPage extends BasePage{

    constructor(page) {
        super();
        this.page = page;

        this.txtPageHeader = page.locator("//h1[text()='Privacy policy']");
    }

    async isPrivacyPolicyPageDisplayed() {
        await expect(this.page).toHaveTitle("Privacy policy – Veriff");
    }

    async isPrivacyPolicyPageHeaderDisplayed() {
        await expect(this.txtPageHeader).toHaveText("Privacy policy");
    }
}