const { test, expect, chromium } = require('@playwright/test');
const { SessionConfigurationPage } = require('../../pages/SessionConfigurationPage');
const { IntroPageRedirect } = require('../../pages/IntroPageRedirect');
const { IntroPageIncontext } = require('../../pages/IntroPageIncontext');
const { DataValidationPageRedirect } = require('../../pages/DataValidationPageRedirect');
const { DataValidationInContextPage } = require('../../pages/DataValidationInContextPage');
const { PrivacyPolicyPage } = require('../../pages/PrivacyPolicyPage');
const testdata = require('../../test-resources/test-data/ui_test_data.json');
const config = require("../../../playwright.config");
const baseURL = config.use.baseURL;
let sessionConfigurationPage;
let introPageIncontext;
let dataValidationInContextPage;
let introPageRedirect;
let dataValidationPageRedirect;
let privacyPolicyPage;

test.beforeEach(async () => {
    const browser =  await chromium.launch({args: ['--use-fake-ui-for-media-stream','--no-sandbox']});
    const page = await browser.newPage();
    sessionConfigurationPage = new SessionConfigurationPage(page);
    introPageIncontext = new IntroPageIncontext(page);
    dataValidationInContextPage = new DataValidationInContextPage(page);
    introPageRedirect = new IntroPageRedirect(page);
    dataValidationPageRedirect = new DataValidationPageRedirect(page);
    privacyPolicyPage = new PrivacyPolicyPage(page);
    await page.goto(baseURL);
});

test.describe('Veriffme Configuration UI Tests', () => {

    test('Veriffme with passport document type via redirect', async () => {
        await sessionConfigurationPage.fillDetailsInSessionConfigurationPage(testdata.passport.fullName, testdata.passport.sessionLanguage, testdata.passport.documentCountry, testdata.passport.documentType, testdata.passport.launchMethod);
        expect(await introPageRedirect.isRedirectIntroPageDisplayed());
        await introPageRedirect.clickOnStartSession();
        await dataValidationPageRedirect.isTextMessageDisplayed(testdata.passport.documentType);
        await dataValidationPageRedirect.isImgDisplayed(testdata.passport.documentToVerify);
    });

    test('Veriffme with Drivers License document type via InContext', async () => {

        await sessionConfigurationPage.fillDetailsInSessionConfigurationPage(testdata.license.fullName, testdata.license.sessionLanguage, testdata.license.documentCountry, testdata.license.documentType, testdata.license.launchMethod);
        expect(await introPageIncontext.isIncontextIntroPageDisplayed());
        await introPageIncontext.clickOnStartSession();
        await dataValidationInContextPage.isTextMessageDisplayed(testdata.license.documentToVerify);
        await dataValidationInContextPage.isImgDisplayed(testdata.license.imageToVerify);
    });

    test('Veriffme with ID Card document type via InContext', async () => {

        await sessionConfigurationPage.fillDetailsInSessionConfigurationPage(testdata.idCard.fullName, testdata.idCard.sessionLanguage, testdata.idCard.documentCountry, testdata.idCard.documentType, testdata.idCard.launchMethod);
        expect(await introPageIncontext.isIncontextIntroPageDisplayed());
        await introPageIncontext.clickOnStartSession();
        await dataValidationInContextPage.isTextMessageDisplayed(testdata.idCard.documentToVerify);
        await dataValidationInContextPage.isImgDisplayed(testdata.idCard.imageToVerify);
    });

    test('Verify "Privacy Policy" Link', async () => {

        await sessionConfigurationPage.clickOnPrivacyPolicyLink();
        expect(await privacyPolicyPage.isPrivacyPolicyPageDisplayed());
        expect(await privacyPolicyPage.isPrivacyPolicyPageHeaderDisplayed());
    });

});
