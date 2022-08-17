const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

exports.SessionConfigurationPage = class SessionConfigurationPage extends BasePage {

    constructor(page) {
        super();
        this.page = page;

        this.txtFullName = page.locator("//input[contains(@name,'name')]");
        this.drpdwnSessionLanguage = page.locator("//button[contains(@name,'language')]");
        this.txtSessionLanguage = page.locator("//span[text()='{1}']/parent::li");
        this.drpdwnDocumentCountry = page.locator("//input[contains(@name,'documentCountry')]");
        this.txtDocumentCountry = page.locator("//li[@role='option']//span[text()='{1}']");
        this.drpdwnDocumentType = page.locator("//button[@name='documentType']");
        this.txtDocumentType = page.locator('li[role="option"]:has-text("{1}")');
        this.radiobtnLaunchType = page.locator("//input[@value='{1}']");
        this.btnVeriffMe = page.locator("//button[text()='Veriff Me']");
        this.lnkPrivacyPolicy = page.locator("//a[text()='Privacy Policy.']");
    }

    async fillDetailsInSessionConfigurationPage(fullName, language, documentCountry, docType, launchType) {
        await this.enterUserName(fullName);
        await this.clickOnSessionLanguageDropDown();
        await this.selectSessionLanguage(language);
        await this.clickOnDocumentCountryDropDown();
        await this.selectDocumentCountry(documentCountry);
        await this.clickOnDocumentTypeDropDown();
        await this.selectDocumentType(docType);
        await this.selectLaunchTypeRadioButton(launchType);
        await this.clickOnVeriffMeButton();
    }

    async enterUserName(fullName) {
        await this.txtFullName.fill(fullName);
    }

    async clickOnSessionLanguageDropDown() {
        await this.drpdwnSessionLanguage.click();
    }

    async selectSessionLanguage(language) {
        this.txtSessionLanguage = await this.replace(this.txtSessionLanguage, language, this.page);
        await this.txtSessionLanguage.click();
    }

    async clickOnDocumentCountryDropDown() {
        await this.drpdwnDocumentCountry.click();
    }

    async selectDocumentCountry(documentCountry) {

        this.txtDocumentCountry = await this.replace(this.txtDocumentCountry, documentCountry, this.page);
        await this.txtDocumentCountry.click();
    }

    async clickOnDocumentTypeDropDown() {
        await this.drpdwnDocumentType.click();
    }

    async selectDocumentType(docType) {
        this.txtDocumentType = await this.replace(this.txtDocumentType, docType, this.page);
        await this.txtDocumentType.click();
    }

    async selectLaunchTypeRadioButton(launchType) {
        this.radiobtnLaunchType = await this.replace(this.radiobtnLaunchType, launchType, this.page);
        await this.radiobtnLaunchType.click();
    }

    async clickOnPrivacyPolicyLink() {
        await this.lnkPrivacyPolicy.click();
    }

    async clickOnVeriffMeButton() {
        await this.btnVeriffMe.click();
    }
}